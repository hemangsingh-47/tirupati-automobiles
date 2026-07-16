import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Shield, User as UserIcon } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useAuth } from '../context/AuthContext';
import { useCustomerAuth } from '../context/CustomerAuthContext';
import WhatsAppButton from './common/WhatsAppButton';
import CallButton from './common/CallButton';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const location = useLocation();
  const { settings } = useSettings();
  const { user } = useAuth();
  const { customer } = useCustomerAuth();
  const [isCustomerMenuOpen, setIsCustomerMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Media', path: '/media' },
    { name: 'Insurance Claim', path: '/insurance' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsAdminMenuOpen(false);
    setIsCustomerMenuOpen(false);
  }, [location.pathname]);

  const businessName = settings?.businessName || 'Tirupati Automobiles';
  const phone = settings?.phone || '+91 98765 43210';
  const nameParts = businessName.split(' ');
  const firstName = nameParts[0];
  const secondName = nameParts.slice(1).join(' ');

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-surface py-4 md:py-5 shadow-lg border-b border-white/5' : 'bg-transparent py-5 md:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center w-full gap-4 xl:gap-8">
          {/* Left: Logo & Brand */}
          <div className="flex items-center shrink-0">
            <Link to="/" className="flex items-center gap-2">
              {settings?.logo ? (
                <img src={settings.logo} alt={settings.businessName || 'Tirupati Automobiles'} className="h-10 md:h-12 lg:h-14 object-contain transition-all" />
              ) : (
                <div className="flex items-center gap-2 md:gap-3">
                  <img src="/logo.png" alt="Tirupati Automobiles" className="h-10 md:h-12 lg:h-14 object-contain bg-white rounded-lg px-2 py-1 transition-all" />
                  <div className="hidden sm:flex items-baseline gap-1">
                    <span className="text-xl font-heading font-bold text-primary">{firstName}</span>
                    <span className="text-xl font-heading font-bold text-white">{secondName}</span>
                  </div>
                </div>
              )}
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden lg:flex flex-1 justify-center items-center gap-4 xl:gap-8 px-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-primary flex items-center h-10 ${
                  location.pathname === link.path ? 'text-primary' : 'text-gray'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
            
          {/* Right: Actions */}
          <div className="hidden lg:flex items-center justify-end gap-4 xl:gap-6 shrink-0">
            {/* Customer Portal Dropdown */}
            <div className="relative group flex items-center h-10">
              <button 
                onClick={() => {
                  setIsCustomerMenuOpen(!isCustomerMenuOpen);
                  setIsAdminMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-sm font-medium whitespace-nowrap text-gray hover:text-primary transition-colors"
              >
                <UserIcon className="w-4 h-4" />
                Customer
              </button>
              
              <AnimatePresence>
                {isCustomerMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-surface border border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden z-50"
                  >
                    {customer ? (
                      <Link 
                        to="/customer/dashboard"
                        className="block px-4 py-2 text-sm text-gray hover:bg-white/5 hover:text-primary transition-colors"
                      >
                        My Dashboard
                      </Link>
                    ) : (
                      <>
                        <Link 
                          to="/customer/login"
                          className="block px-4 py-2 text-sm text-gray hover:bg-white/5 hover:text-primary transition-colors"
                        >
                          <span className="flex items-center gap-2"><UserIcon className="w-4 h-4"/> Login</span>
                        </Link>
                        <Link 
                          to="/customer/register"
                          className="block px-4 py-2 text-sm text-gray hover:bg-white/5 hover:text-primary transition-colors"
                        >
                          <span className="flex items-center gap-2"><UserIcon className="w-4 h-4"/> Register</span>
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Admin Portal Dropdown */}
            <div className="relative group flex items-center h-10">
              <button 
                onClick={() => {
                  setIsAdminMenuOpen(!isAdminMenuOpen);
                  setIsCustomerMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-sm font-medium whitespace-nowrap text-gray hover:text-primary transition-colors"
              >
                <Shield className="w-4 h-4" />
                Admin
              </button>
              
              <AnimatePresence>
                {isAdminMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-surface border border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden z-50"
                  >
                    {user ? (
                      <Link 
                        to={`/${user.role}/dashboard`}
                        className="block px-4 py-2 text-sm text-gray hover:bg-white/5 hover:text-primary transition-colors"
                      >
                        Go to Dashboard
                      </Link>
                    ) : (
                      <>
                        <Link 
                          to="/admin/login"
                          className="block px-4 py-2 text-sm text-gray hover:bg-white/5 hover:text-primary transition-colors"
                        >
                          <span className="flex items-center gap-2"><Shield className="w-4 h-4"/> Admin Login</span>
                        </Link>
                        <Link 
                          to="/staff/login"
                          className="block px-4 py-2 text-sm text-gray hover:bg-white/5 hover:text-primary transition-colors"
                        >
                          <span className="flex items-center gap-2"><UserIcon className="w-4 h-4"/> Staff Login</span>
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/book" className="flex items-center justify-center bg-primary text-black h-10 px-6 rounded-md text-sm font-bold hover:bg-yellow-500 transition-colors whitespace-nowrap shadow-lg hover:shadow-primary/20">
              Book Service
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center justify-end flex-1">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-primary transition-colors focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-surface overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 shadow-xl border-t border-white/5 mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-3 py-3 rounded-md text-base font-medium ${
                    location.pathname === link.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {customer ? (
                <Link
                  to="/customer/dashboard"
                  className="block px-3 py-3 rounded-md text-base font-medium text-gray hover:bg-white/5 hover:text-white flex items-center gap-2"
                >
                  <UserIcon className="w-4 h-4" /> My Dashboard
                </Link>
              ) : (
                <Link
                  to="/customer/login"
                  className="block px-3 py-3 rounded-md text-base font-medium text-gray hover:bg-white/5 hover:text-white flex items-center gap-2"
                >
                  <UserIcon className="w-4 h-4" /> Customer Portal
                </Link>
              )}
              
              <Link
                to="/admin/login"
                className="block px-3 py-3 rounded-md text-base font-medium text-gray hover:bg-white/5 hover:text-white flex items-center gap-2"
              >
                <Shield className="w-4 h-4" /> Admin Portal
              </Link>

              <div className="pt-4 flex flex-col space-y-3">
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <CallButton className="w-full py-4 min-h-[48px]" />
                  <WhatsAppButton className="w-full py-4 min-h-[48px]" />
                </div>
                <Link to="/book" className="w-full text-center bg-primary text-background px-4 py-4 rounded-md text-base font-semibold hover:bg-yellow-500 transition-colors min-h-[48px] flex items-center justify-center">
                  Book Service
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
