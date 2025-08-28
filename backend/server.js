const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'jmcci_db'
};

let db;
async function connectToDatabase() {
    try {
        db = await mysql.createConnection(dbConfig);
        console.log('MySQL Database se connection safal raha!');
        // Yahan database tables create karne ka logic daala ja sakta hai agar woh exist nahi karti
    } catch (error) {
        console.error('Database connection fail ho gaya:', error);
        process.exit(1); // Agar DB connect na ho to server band kar dein
    }
}

connectToDatabase();

// File Upload Setup (Multer)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) // Unique filename
    }
});
const upload = multer({ storage: storage });

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

// ===================================
// AUTHENTICATION ROUTES
// ===================================

// User Registration
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Sabhi fields zaroori hain.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.execute(
            'INSERT INTO users (displayName, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, 'user']
        );
        res.status(201).json({ message: 'User safaltapoorvak register ho gaya.', userId: result.insertId });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Is email se account pehle se hai.' });
        }
        res.status(500).json({ message: 'Server error, baad mein try karein.', error: error.message });
    }
});

// User Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email aur password zaroori hain.' });
    }

    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if (!user) {
            return res.status(404).json({ message: 'User nahi mila.' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Galat password.' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

        // Password ko response se hata dein
        const { password: _, ...userData } = user;

        res.json({ token, user: userData });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication token nahi hai.' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

// ===================================
// MEMBERSHIP ROUTES
// ===================================
app.post('/api/membership-apply', authMiddleware, upload.fields([
    { name: 'ownerPhoto', maxCount: 1 },
    { name: 'businessPhoto', maxCount: 1 },
    { name: 'businessDocs', maxCount: 1 }
]), async (req, res) => {
    const { businessName, ownerName, address, ownerContact, ownerEmail, businessCategory, otherCategory } = req.body;
    const applicantId = req.user.id;

    const ownerPhotoUrl = req.files['ownerPhoto'] ? `/uploads/${req.files['ownerPhoto'][0].filename}` : null;
    const businessPhotoUrl = req.files['businessPhoto'] ? `/uploads/${req.files['businessPhoto'][0].filename}` : null;
    const businessDocsUrl = req.files['businessDocs'] ? `/uploads/${req.files['businessDocs'][0].filename}` : null;

    const finalCategory = businessCategory === 'Other' ? otherCategory : businessCategory;

    try {
        await db.execute(
            'INSERT INTO membership_applications (businessName, ownerName, address, ownerContact, ownerEmail, businessCategory, applicantId, ownerPhotoUrl, businessPhotoUrl, businessDocsUrl, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [businessName, ownerName, address, ownerContact, ownerEmail, finalCategory, applicantId, ownerPhotoUrl, businessPhotoUrl, businessDocsUrl, 'pending']
        );
        res.status(201).json({ message: 'Aapki application jama ho gayi hai.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});


// ===================================
// ADMIN ROUTES
// ===================================
const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
        return res.status(403).json({ message: 'Access denied. Sirf admin hi access kar sakte hain.' });
    }
    next();
};

app.get('/api/admin/stats', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const [[{ totalUsers }]] = await db.execute('SELECT COUNT(*) as totalUsers FROM users');
        const [[{ totalAds }]] = await db.execute('SELECT COUNT(*) as totalAds FROM advertisements');
        const [[{ pendingAds }]] = await db.execute('SELECT COUNT(*) as pendingAds FROM advertisements WHERE status = "pending"');
        const [[{ pendingMembers }]] = await db.execute('SELECT COUNT(*) as pendingMembers FROM membership_applications WHERE status = "pending"');

        res.json({ totalUsers, totalAds, pendingAds, pendingMembers });
    } catch (error) {
        res.status(500).json({ message: 'Stats fetch karne mein error.', error: error.message });
    }
});

app.get('/api/admin/users', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const [users] = await db.execute('SELECT id, displayName, email, role FROM users');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Users fetch karne mein error.', error: error.message });
    }
});

app.put('/api/admin/users/:id/role', authMiddleware, adminMiddleware, async (req, res) => {
    const { role } = req.body;
    const { id } = req.params;
    try {
        await db.execute('UPDATE users SET role = ? WHERE id = ?', [role, id]);
        res.json({ message: 'User role safaltapoorvak update ho gaya.' });
    } catch (error) {
        res.status(500).json({ message: 'Role update karne mein error.', error: error.message });
    }
});


// Server Start
app.listen(PORT, () => {
    console.log(`Server ${PORT} par chal raha hai`);
});