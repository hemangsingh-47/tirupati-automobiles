import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Info, CheckCircle2, AlertTriangle, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/axiosConfig';

const CustomerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await api.get('/customers/bookings/notifications');
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      const { data } = await api.patch(`/customers/bookings/notifications/${id}/read`);
      setNotifications(data);
    } catch (error) {
      console.error('Error marking notification read:', error);
    }
  };

  if (loading) return <div className="text-center mt-10 text-gray">Loading notifications...</div>;

  const getIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBg = (type) => {
    switch(type) {
      case 'success': return 'bg-green-500/10 border-green-500/20';
      case 'warning': return 'bg-yellow-500/10 border-yellow-500/20';
      case 'error': return 'bg-red-500/10 border-red-500/20';
      default: return 'bg-blue-500/10 border-blue-500/20';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-white">Notifications</h1>
        <p className="text-gray">Stay updated on your vehicle service progress.</p>
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-4">
          <AnimatePresence>
            {notifications.map((notif, index) => (
              <motion.div
                key={notif._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className={`border rounded-xl p-4 md:p-6 transition-all ${
                  notif.read ? 'bg-surface border-white/5 opacity-70' : `${getBg(notif.type)} shadow-lg`
                }`}
              >
                <div className="flex gap-4">
                  <div className="mt-1 shrink-0">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <p className={`text-sm md:text-base ${notif.read ? 'text-gray' : 'text-white font-medium'}`}>
                        {notif.message}
                      </p>
                      <span className="text-xs text-gray whitespace-nowrap">
                        {new Date(notif.createdAt).toLocaleDateString()} {new Date(notif.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    
                    <div className="mt-4 flex items-center gap-4">
                      {notif.bookingId && (
                        <Link 
                          to={`/customer/booking/${notif.bookingId}`}
                          className="text-primary hover:underline text-sm font-medium flex items-center gap-1"
                        >
                          View Service <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                      
                      {!notif.read && (
                        <button 
                          onClick={() => markAsRead(notif._id)}
                          className="text-gray hover:text-white text-sm transition-colors"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {!notif.read && (
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2"></div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="bg-surface border border-white/5 rounded-2xl p-16 text-center">
          <Bell className="w-16 h-16 text-gray/30 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">No Notifications</h2>
          <p className="text-gray mb-8">You're all caught up! We'll notify you when there's an update.</p>
        </div>
      )}
    </div>
  );
};

export default CustomerNotifications;
