import { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useCustomerAuth } from '../context/CustomerAuthContext';
import { 
  LayoutDashboard, 
  CarFront, 
  History, 
  User, 
  Bell, 
  LogOut,
  Menu,
  Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomerLayout = () => {
  const { customer, logout } = useCustomerAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/customer/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/customer/dashboard', icon: LayoutDashboard },
    { name: 'My Bookings', path: '/customer/bookings', icon: CarFront },
    { name: 'Service History', path: '/customer/service-history', icon: History },
    { name: 'Profile', path: '/customer/profile', icon: User },
    { name: 'Notifications', path: '/customer/notifications', icon: Bell },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-surface border-r border-white/5">
      <div className="h-20 flex items-center px-6 border-b border-white/5 shrink-0 justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-heading font-bold text-white truncate hover:text-primary transition-colors">
          <span className="text-primary">TAS</span> Portal
        </Link>
        <Link to="/" className="text-gray hover:text-primary transition-colors" title="Back to Website">
          <Home className="w-5 h-5" />
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => setIsMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive 
                  ? 'bg-primary/10 text-primary border border-primary/20' 
                  : 'text-gray hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span className={!isSidebarOpen && !isMobileOpen ? 'hidden' : 'block'}>{item.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-white/5 shrink-0">
        <div className={`mb-4 px-4 ${!isSidebarOpen && !isMobileOpen ? 'hidden' : 'block'}`}>
          <p className="text-sm font-bold text-white truncate">{customer?.name}</p>
          <p className="text-xs text-gray truncate">{customer?.email}</p>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors font-medium"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span className={!isSidebarOpen && !isMobileOpen ? 'hidden' : 'block'}>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex overflow-hidden">
      {/* Desktop Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="hidden lg:block h-screen flex-shrink-0 z-20 relative"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/80 z-30 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-[280px] z-40 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <header className="h-20 bg-surface/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 sticky top-0 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 text-gray hover:text-white bg-white/5 rounded-md"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:block p-2 text-gray hover:text-white bg-white/5 rounded-md transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            {/* Notification Badge could go here */}
            {customer?.profilePicture ? (
              <img 
                src={customer.profilePicture} 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover border-2 border-primary/50"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg border-2 border-primary/50">
                {customer?.name?.charAt(0)}
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CustomerLayout;
