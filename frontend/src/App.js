import React, { useState, useEffect, useRef, createContext, useContext } from 'react';

// API Base URL - Yeh aapke Hostinger server ka URL hoga
// Abhi testing ke liye, yeh hamare local Node.js server par point kar raha hai
const API_URL = 'http://localhost:3001';

// ===================================
// API Service - Backend se baat karne ke liye
// ===================================
const api = {
    async register(name, email, password) {
        const res = await fetch(`${API_URL}/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        return res.json();
    },
    async login(email, password) {
        const res = await fetch(`${API_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        return res.json();
    },
    // Baaki API calls (jaise get products, etc.) yahan add honge
};

// ===================================
// Auth Context - User state ko manage karne ke liye
// ===================================
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // App load hone par token check karein
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (token && userData) {
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const authValue = { user, loading, login, logout };

    return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};


// SVG Icons (Lucide React)
const HomeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
);
const InfoIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
);
const BriefcaseIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
);
const ShoppingCartIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
);
const UsersIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
const CalendarIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
);
const MailIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);
const MenuIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
);
const XIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);
const LogOutIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
);
const SettingsIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
);
const LayoutDashboardIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>
);
const PackageIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16.5 9.4a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z" /><path d="M12 14.1a7.5 7.5 0 0 1-7.5-7.5c0-.6.1-1.1.2-1.6" /><path d="M12 14.1a7.5 7.5 0 0 0 7.5-7.5c0-.6-.1-1.1-.2-1.6" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
);
const MegaphoneIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 11 18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></svg>
);
const BrushIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" /><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" /></svg>
);
const MapPinIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
);
const PhoneIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
);
const PlusCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
);
const CheckCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
);
const XCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
);
const UserCheck = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
);
const UserCog = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="18" cy="15" r="3"/><circle cx="9" cy="7" r="4"/><path d="M10 15H6a4 4 0 0 0-4 4v2"/><path d="m21.7 16.4-.9-.3"/><path d="m15.2 13.9-.9-.3"/><path d="m16.6 18.7.3-.9"/><path d="m19.1 12.2.3-.9"/><path d="m19.6 17.6-.4-1"/><path d="m14.3 15.6-.4-1"/><path d="m20.9 14.3-1-.4"/><path d="m14.8 16.8-1-.4"/></svg>
);
const FileText = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
);
const MessageSquare = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);


// Reusable Components
const Logo = () => (
    <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-[#0F5132] to-[#1a5c3a] rounded-lg flex items-center justify-center text-2xl text-[#B8860B] font-bold">J</div>
        <div>
            <h2 className="text-xl font-bold text-[#0F5132]">JMCCI</h2>
            <p className="text-xs text-gray-500 hidden sm:block">Jabalpur Muslim Chamber of Commerce</p>
        </div>
    </div>
);

const StatCounter = ({ target, label }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                let start = 0;
                const duration = 2000;
                const increment = target / (duration / 16);
                const timer = setInterval(() => {
                    start += increment;
                    if (start >= target) {
                        setCount(target);
                        clearInterval(timer);
                    } else {
                        setCount(Math.ceil(start));
                    }
                }, 16);
                observer.unobserve(ref.current);
            }
        }, { threshold: 0.1 });
        if (ref.current) observer.observe(ref.current);
        return () => ref.current && observer.unobserve(ref.current);
    }, [target]);
    return (
        <div ref={ref} className="text-center p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg min-w-[150px]">
            <div className="text-4xl font-bold text-[#B8860B]">{count.toLocaleString()}</div>
            <div className="text-sm uppercase tracking-wider text-white/90 mt-1">{label}</div>
        </div>
    );
};

const Notification = ({ message, type, onDismiss }) => {
    useEffect(() => {
        const timer = setTimeout(onDismiss, 5000);
        return () => clearTimeout(timer);
    }, [onDismiss]);
    const baseClasses = "p-4 rounded-lg shadow-lg text-sm font-medium animate-fade-in-down";
    const typeClasses = { success: "bg-green-100 text-green-800", error: "bg-red-100 text-red-800" };
    return <div className={`${baseClasses} ${typeClasses[type]}`}>{message}</div>;
};

// Main Application Components
const Header = ({ onPageChange, user, onLogout, onAuthModalOpen, onAdminPanelOpen, onEditModeToggle, isEditMode }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navLinks = [
        { name: "Home", page: "home", icon: <HomeIcon className="w-4 h-4" /> },
        { name: "About", page: "about", icon: <InfoIcon className="w-4 h-4" /> },
        { name: "Services", page: "services", icon: <BriefcaseIcon className="w-4 h-4" /> },
        { name: "Marketplace", page: "marketplace", icon: <ShoppingCartIcon className="w-4 h-4" /> },
        { name: "Join Us", page: "join-us", icon: <UsersIcon className="w-4 h-4" /> },
        { name: "Events", page: "events", icon: <CalendarIcon className="w-4 h-4" /> },
        { name: "Contact", page: "contact", icon: <MailIcon className="w-4 h-4" /> },
    ];
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsDropdownOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const renderNavLinks = (isMobile = false) => (
        navLinks.map(link => (
            <a key={link.page} href="#" onClick={(e) => { e.preventDefault(); onPageChange(link.page); isMobile && setIsMenuOpen(false); }}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isMobile ? 'text-gray-700 hover:bg-green-50 hover:text-[#0F5132]' : 'text-gray-600 hover:text-[#0F5132]'}`}>
                {link.icon} {link.name}
            </a>
        ))
    );
    return (
        <header className="bg-white/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    <div onClick={() => onPageChange('home')} className="cursor-pointer"><Logo /></div>
                    <nav className="hidden lg:flex items-center gap-2">{renderNavLinks()}</nav>
                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-10 h-10 bg-gradient-to-br from-[#0F5132] to-[#1a5c3a] rounded-full text-white font-bold flex items-center justify-center">
                                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border z-10 animate-fade-in-down">
                                        <div className="p-3 border-b">
                                            <p className="font-semibold text-gray-800">{user.displayName || 'User'}</p>
                                            <p className="text-xs text-gray-500 capitalize">{user.role || 'user'}</p>
                                        </div>
                                        <div className="py-1">
                                            <a href="#" onClick={(e) => {e.preventDefault(); onPageChange('profile'); setIsDropdownOpen(false);}} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><UserCog className="w-4 h-4" /> My Profile</a>
                                            {['admin', 'superadmin'].includes(user.role) && <a href="#" onClick={(e) => {e.preventDefault(); onAdminPanelOpen(); setIsDropdownOpen(false);}} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><SettingsIcon className="w-4 h-4" /> Admin Panel</a>}
                                            {user.role === 'superadmin' && <a href="#" onClick={(e) => {e.preventDefault(); onEditModeToggle(); setIsDropdownOpen(false);}} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><BrushIcon className="w-4 h-4" /> {isEditMode ? "Disable Edit Mode" : "Enable Edit Mode"}</a>}
                                        </div>
                                        <div className="border-t py-1">
                                            <a href="#" onClick={(e) => {e.preventDefault(); onLogout(); setIsDropdownOpen(false);}} className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"><LogOutIcon className="w-4 h-4" /> Logout</a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="hidden lg:flex items-center gap-2">
                                <button onClick={() => onAuthModalOpen('login')} className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors">Login</button>
                                <button onClick={() => onAuthModalOpen('register')} className="px-4 py-2 text-sm font-medium text-white bg-[#0F5132] rounded-md hover:bg-[#0a3d24] transition-colors">Register</button>
                            </div>
                        )}
                        <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}><MenuIcon className="w-6 h-6 text-gray-700" /></button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="lg:hidden bg-white border-t animate-fade-in-down">
                    <div className="px-4 pt-2 pb-3 space-y-1">
                        {renderNavLinks(true)}
                         {!user && (
                            <div className="pt-4 mt-4 border-t">
                                <button onClick={() => {onAuthModalOpen('login'); setIsMenuOpen(false);}} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Login</button>
                                <button onClick={() => {onAuthModalOpen('register'); setIsMenuOpen(false);}} className="w-full text-left mt-1 block px-3 py-2 rounded-md text-base font-medium text-white bg-[#0F5132] hover:bg-[#0a3d24]">Register</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

// Editable Content Component for Superadmin
const Editable = ({ contentKey, isEditMode, children, as: Component = 'div' }) => {
    const [text, setText] = useState(children);

    useEffect(() => {
        // This component is now a placeholder as content is managed by Node.js backend
        // In a real scenario, you'd fetch this from your Node.js API
        setText(children);
    }, [children]);

    const handleBlur = async (e) => {
        const newText = e.target.innerText;
        // In a real scenario, you'd send this to your Node.js API to save
        console.log(`Saving content for ${contentKey}: ${newText}`);
    };

    return (
        <Component
            contentEditable={isEditMode}
            suppressContentEditableWarning={true}
            onBlur={handleBlur}
            className={isEditMode ? "outline-2 outline-dashed outline-yellow-500 p-1 rounded" : ""}
        >
            {text}
        </Component>
    );
};


const HomePage = ({ onPageChange, isEditMode }) => {
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        // This would fetch from your Node.js API
    }, []);

    return (
        <div className="animate-fade-in">
            <section className="bg-gradient-to-br from-[#0F5132] to-[#1a5c3a] text-white pt-32 pb-20 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-slide-in-up">
                        <Editable contentKey="heroTitle" isEditMode={isEditMode} as="span">Welcome to JMCCI</Editable>
                    </h1>
                    <p className="text-lg md:text-xl mb-2 text-white/90">
                       <Editable contentKey="heroSubtitleEn" isEditMode={isEditMode} as="span">Jabalpur Muslim Chamber of Commerce & Industries</Editable>
                    </p>
                    <p className="text-xl md:text-2xl mb-8 text-[#B8860B] font-['Noto_Nastaliq_Urdu']">
                        <Editable contentKey="heroSubtitleUr" isEditMode={isEditMode} as="span">خود کفیل سماج، خوشحال بھارت</Editable>
                    </p>
                    <div className="flex justify-center gap-4 mb-12">
                        <button onClick={() => onPageChange('marketplace')} className="bg-[#B8860B] hover:bg-[#a0740a] text-white font-bold py-3 px-8 rounded-lg transition-transform hover:scale-105">Explore Marketplace</button>
                        <button onClick={() => onPageChange('about')} className="bg-transparent border-2 border-white hover:bg-white hover:text-[#0F5132] text-white font-bold py-3 px-8 rounded-lg transition-colors">Learn More</button>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        <StatCounter target={532} label="Active Members" />
                        <StatCounter target={29} label="Years of Service" />
                        <StatCounter target={1247} label="Businesses Supported" />
                    </div>
                </div>
            </section>
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl font-bold text-[#0F5132]">Latest Products</h2>
                        <button onClick={() => onPageChange('marketplace')} className="text-[#0F5132] font-semibold hover:text-[#B8860B]">View All &rarr;</button>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Latest products would be mapped here */}
                    </div>
                </div>
            </section>
        </div>
    );
};

const Footer = ({ onPageChange }) => (
    <footer className="bg-[#0F5132] text-white">
        <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                <div> <Logo /> <p className="mt-4 text-sm text-white/70">Fostering business excellence and economic growth in the Muslim community since 1995.</p> </div>
                <div>
                    <h4 className="font-bold text-[#B8860B] mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="#" onClick={(e) => {e.preventDefault(); onPageChange('about')}} className="text-white/80 hover:text-white">About Us</a></li>
                        <li><a href="#" onClick={(e) => {e.preventDefault(); onPageChange('marketplace')}} className="text-white/80 hover:text-white">Marketplace</a></li>
                        <li><a href="#" onClick={(e) => {e.preventDefault(); onPageChange('members')}} className="text-white/80 hover:text-white">Membership</a></li>
                        <li><a href="#" onClick={(e) => {e.preventDefault(); onPageChange('contact')}} className="text-white/80 hover:text-white">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-[#B8860B] mb-4">Contact Info</h4>
                     <ul className="space-y-3 text-white/80">
                        <li className="flex items-start gap-3"><MapPinIcon className="w-5 h-5 mt-1 text-[#B8860B]" /><span>Chamber Building, Civil Lines, Jabalpur, MP 482001</span></li>
                        <li className="flex items-center gap-3"><PhoneIcon className="w-5 h-5 text-[#B8860B]" /><span>+91 88892 43625</span></li>
                        <li className="flex items-center gap-3"><MailIcon className="w-5 h-5 text-[#B8860B]" /><span>zaidakhter51@gmail.com</span></li>
                    </ul>
                </div>
                 <div><h4 className="font-bold text-[#B8860B] mb-4">Follow Us</h4></div>
            </div>
        </div>
        <div className="bg-[#0a3d24]"><div className="container mx-auto px-4 py-4 text-center text-sm text-white/60"><p>© {new Date().getFullYear()} JMCCI. All Rights Reserved.</p></div></div>
    </footer>
);

const AuthModal = ({ isOpen, onClose, authType, onSwitch, onLogin, onRegister, error }) => {
    if (!isOpen) return null;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const result = await api.login(email, password);
        if (result.token) {
            onLogin(result.user, result.token);
        } else {
            // Handle error
        }
    };
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const result = await api.register(name, email, password);
        if (result.userId) {
            // Automatically log in after registration or show success message
            onSwitch('login');
        } else {
            // Handle error
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"><XIcon className="w-6 h-6" /></button>
                {error && <p className="bg-red-100 text-red-700 text-sm p-3 rounded-md mb-4">{error}</p>}
                {authType === 'login' ? (
                    <div>
                        <h2 className="text-2xl font-bold text-center text-[#0F5132] mb-6">Login to JMCCI</h2>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/></div>
                            <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/></div>
                            <button type="submit" className="w-full bg-[#0F5132] text-white py-2 rounded-md hover:bg-[#0a3d24]">Login</button>
                        </form>
                        <p className="text-center text-sm text-gray-600 mt-6">Don't have an account? <a href="#" onClick={(e) => {e.preventDefault(); onSwitch('register')}} className="font-medium text-[#0F5132] hover:underline">Register here</a></p>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold text-center text-[#0F5132] mb-6">Register with JMCCI</h2>
                        <form onSubmit={handleRegisterSubmit}>
                             <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/></div>
                            <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/></div>
                            <div className="mb-6"><label className="block text-sm font-medium text-gray-700 mb-1">Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/></div>
                            <button type="submit" className="w-full bg-[#0F5132] text-white py-2 rounded-md hover:bg-[#0a3d24]">Register</button>
                        </form>
                        <p className="text-center text-sm text-gray-600 mt-6">Already have an account? <a href="#" onClick={(e) => {e.preventDefault(); onSwitch('login')}} className="font-medium text-[#0F5132] hover:underline">Login here</a></p>
                    </div>
                )}
            </div>
        </div>
    );
};

// ... Baaki saare components (ProductCard, MarketplacePage, etc.) yahan aayenge ...

// Main App Component
function AppContent() {
    const [currentPage, setCurrentPage] = useState('home');
    const { user, login, logout } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authType, setAuthType] = useState('login');
    const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
    const [notification, setNotification] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const showNotification = (message, type = 'success') => setNotification({ message, type });
    const handlePageChange = (page) => { setCurrentPage(page); window.scrollTo(0, 0); };
    const handleAuthModalOpen = (type) => { setAuthType(type); setIsAuthModalOpen(true); };

    const handleLogin = (userData, token) => {
        login(userData, token);
        setIsAuthModalOpen(false);
        showNotification('Successfully logged in!', 'success');
    };

    const handleLogout = () => {
        logout();
        handlePageChange('home');
        showNotification('You have been logged out.', 'success');
    };
    
    const handleRegister = () => {
        showNotification('Registration successful! Please log in.', 'success');
    };

    const renderCurrentPage = () => {
        // ... switch case for pages ...
        return <HomePage onPageChange={handlePageChange} isEditMode={isEditMode} />;
    };

    return (
        <div className="font-sans">
            <div className="fixed top-24 right-4 z-[101]">
                {notification && <Notification message={notification.message} type={notification.type} onDismiss={() => setNotification(null)} />}
            </div>
            <Header 
                onPageChange={handlePageChange}
                user={user}
                onLogout={handleLogout}
                onAuthModalOpen={handleAuthModalOpen}
                onAdminPanelOpen={() => setIsAdminPanelOpen(true)}
                onEditModeToggle={() => setIsEditMode(!isEditMode)}
                isEditMode={isEditMode}
            />
            <main>{renderCurrentPage()}</main>
            <Footer onPageChange={handlePageChange} />
            <AuthModal 
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                authType={authType}
                onSwitch={setAuthType}
                onLogin={handleLogin}
                onRegister={handleRegister}
            />
        </div>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}
