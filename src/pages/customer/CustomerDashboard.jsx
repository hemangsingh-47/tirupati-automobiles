import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCustomerAuth } from '../../context/CustomerAuthContext';
import api from '../../api/axiosConfig';
import { CarFront, Clock, CheckCircle, AlertCircle, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
  const { customer } = useCustomerAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get('/customers/bookings');
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const activeBookings = bookings.filter(b => b.status !== 'Delivered');
  const completedBookings = bookings.filter(b => b.status === 'Delivered');
  
  const stats = [
    { label: 'Active Services', value: activeBookings.length, icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Completed', value: completedBookings.length, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Total Vehicles', value: new Set(bookings.map(b => b.registrationNumber)).size, icon: CarFront, color: 'text-primary', bg: 'bg-primary/10' },
  ];

  if (loading) return <div className="text-gray text-center mt-10">Loading Dashboard...</div>;

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface border border-white/5 rounded-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold font-heading text-white mb-2">
              Welcome back, {customer?.name}! 👋
            </h1>
            <p className="text-gray">Here is what's happening with your vehicles today.</p>
          </div>
          <Link 
            to="/book" 
            className="bg-primary text-background font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors shadow-lg flex items-center gap-2 whitespace-nowrap"
          >
            <Calendar className="w-5 h-5" />
            Book New Service
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-background border border-white/5 rounded-2xl p-6 flex items-center gap-4"
          >
            <div className={`w-14 h-14 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-gray text-sm font-medium">{stat.label}</p>
              <h3 className="text-3xl font-bold font-heading text-white">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Booking Widget */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-heading text-white">Active Services</h2>
            <Link to="/customer/bookings" className="text-primary hover:underline text-sm flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {activeBookings.length > 0 ? (
            <div className="space-y-4">
              {activeBookings.slice(0, 3).map((booking) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-surface border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-colors group cursor-pointer"
                >
                  <Link to={`/customer/booking/${booking._id}`} className="block">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                          <CarFront className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                            {booking.carBrand} {booking.carModel}
                          </h3>
                          <p className="text-gray text-sm">{booking.registrationNumber} • {booking.serviceType}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-bold uppercase tracking-wide">
                          {booking.status}
                        </span>
                        <p className="text-gray text-xs">
                          Booked on: {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-surface border border-white/5 rounded-2xl p-10 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-gray" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No Active Services</h3>
              <p className="text-gray mb-6">Your vehicles are all good to go!</p>
            </div>
          )}
        </div>

        {/* Quick Actions / Up-sell Widget */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold font-heading text-white">Quick Actions</h2>
          <div className="bg-gradient-to-br from-surface to-background border border-white/5 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <AlertCircle className="w-24 h-24 text-primary" />
            </div>
            <div className="relative z-10 space-y-4">
              <h3 className="text-lg font-bold text-white">Need an Emergency Repair?</h3>
              <p className="text-gray text-sm leading-relaxed">
                Stranded or facing a breakdown? Use our priority booking for immediate assistance.
              </p>
              <Link to="/book" className="w-full bg-white/5 hover:bg-white/10 text-white font-medium px-4 py-3 rounded-lg border border-white/10 transition-colors flex items-center justify-center gap-2">
                Emergency Service
              </Link>
            </div>
          </div>
          
          <div className="bg-surface border border-white/5 rounded-2xl p-6 text-center">
            <h3 className="font-bold text-white mb-2">Update Profile</h3>
            <p className="text-gray text-sm mb-4">Keep your contact details up to date.</p>
            <Link to="/customer/profile" className="text-primary hover:underline text-sm font-medium">
              Manage Profile &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
