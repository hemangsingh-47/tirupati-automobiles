import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CarFront, Calendar as CalendarIcon, Clock, ArrowRight, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/axiosConfig';

const CustomerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get('/customers/bookings');
        setBookings(data.filter(b => b.status !== 'Delivered'));
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div className="text-center mt-10 text-gray">Loading active bookings...</div>;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">Active Services</h1>
          <p className="text-gray">Track the current status of your vehicles in the workshop.</p>
        </div>
        <Link 
          to="/book" 
          className="bg-primary text-background font-bold px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
        >
          Book New Service
        </Link>
      </div>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-colors flex flex-col"
            >
              <div className="p-6 border-b border-white/5 flex-1">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 border border-primary/20">
                      <CarFront className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{booking.carBrand} {booking.carModel}</h3>
                      <p className="text-gray">{booking.registrationNumber}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-wide text-center">
                    {booking.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray">
                    <Wrench className="w-4 h-4 text-primary" />
                    <span>{booking.serviceType}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                    <span>Drop-off: {new Date(booking.preferredDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Time: {booking.preferredTime}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-background p-4 shrink-0">
                <Link 
                  to={`/customer/booking/${booking._id}`}
                  className="w-full flex items-center justify-center gap-2 text-primary hover:text-yellow-500 font-medium transition-colors"
                >
                  Track Live Status <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-surface border border-white/5 rounded-2xl p-16 text-center">
          <CarFront className="w-16 h-16 text-gray/30 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">No Active Services</h2>
          <p className="text-gray mb-8">You don't have any vehicles currently in the workshop.</p>
          <Link 
            to="/book" 
            className="bg-white/5 border border-white/10 text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors inline-block"
          >
            Book a Service Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default CustomerBookings;
