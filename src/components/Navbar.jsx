import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Activity, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
  ];

  if (user) {
    if (user.role === 'doctor') {
      navLinks.push({ name: 'Doctor Panel', path: '/doctor-panel' });
    } else {
      navLinks.push({ name: 'Upload', path: '/upload' });
    }
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-soft py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary-600 p-2 rounded-xl">
              <Activity className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-accent-600">
              SkinAI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-slate-600 hover:text-primary-600 font-medium transition-colors"
                onClick={(e) => {
                  if (link.path.startsWith('/#')) {
                    e.preventDefault();
                    document.getElementById(link.path.substring(2))?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-full border border-primary-100">
                  <User className="w-4 h-4 text-primary-600" />
                  <span className="text-sm font-semibold text-primary-700">{user.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary px-8">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-3 text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 rounded-xl"
                  onClick={() => {
                    setIsOpen(false);
                    if (link.path.startsWith('/#')) {
                      document.getElementById(link.path.substring(2))?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-100">
                {user ? (
                  <div className="flex items-center justify-between px-3">
                    <span className="font-semibold text-slate-700">{user.name}</span>
                    <button onClick={handleLogout} className="text-red-500 font-medium">Logout</button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login" className="block w-full text-center py-3 text-slate-600 font-medium bg-slate-50 rounded-xl" onClick={() => setIsOpen(false)}>
                      Login
                    </Link>
                    <Link to="/signup" className="block w-full btn btn-primary text-center" onClick={() => setIsOpen(false)}>
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
