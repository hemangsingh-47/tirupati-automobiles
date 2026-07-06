import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CarFront, Clock, FileText, CheckCircle2, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import api from '../../api/axiosConfig';

const CustomerBookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const { data } = await api.get(`/customers/bookings/${id}`);
        setBooking(data);
      } catch (error) {
        console.error('Error fetching booking details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  if (loading) return <div className="text-center mt-10 text-gray">Loading booking details...</div>;
  if (!booking) return <div className="text-center mt-10 text-red-400">Booking not found.</div>;

  const timelineStatuses = [
    'Booking Received',
    'Vehicle Received',
    'Inspection',
    'Repair Started',
    'Quality Check',
    'Ready For Delivery',
    'Delivered'
  ];

  const currentStatusIndex = timelineStatuses.indexOf(booking.status);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link to="/customer/bookings" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">Service Details</h1>
          <p className="text-gray">Track your vehicle's repair progress.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Vehicle Info Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 bg-surface border border-white/5 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <CarFront className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{booking.carBrand} {booking.carModel}</h2>
                <p className="text-primary font-medium">{booking.registrationNumber}</p>
              </div>
            </div>
            <span className="px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-sm font-bold uppercase tracking-wide">
              {booking.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <p className="text-sm text-gray mb-1">Service Type</p>
              <p className="font-medium text-white">{booking.serviceType}</p>
            </div>
            <div>
              <p className="text-sm text-gray mb-1">Fuel Type</p>
              <p className="font-medium text-white">{booking.fuelType}</p>
            </div>
            <div>
              <p className="text-sm text-gray mb-1">Drop-off Date</p>
              <p className="font-medium text-white">{new Date(booking.preferredDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray mb-1">Drop-off Time</p>
              <p className="font-medium text-white">{booking.preferredTime}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray mb-1">Problem Description</p>
              <p className="text-white bg-background p-4 rounded-lg text-sm border border-white/5">
                {booking.problemDescription || "No specific problems mentioned."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Live Timeline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border border-white/5 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-white mb-6 font-heading flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" /> Tracking Timeline
          </h3>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {timelineStatuses.map((status, index) => {
              const isCompleted = currentStatusIndex >= index;
              const isCurrent = currentStatusIndex === index;
              // Find if this status has a history entry
              const historyEntry = booking.statusHistory.find(h => h.status === status);

              return (
                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 bg-surface shrink-0 z-10 
                    ${isCompleted ? 'border-primary shadow-[0_0_10px_rgba(252,211,77,0.5)]' : 'border-white/10'}
                  `}>
                    {isCompleted ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <div className="w-2 h-2 rounded-full bg-white/20" />}
                  </div>
                  
                  <div className={`w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-3 rounded-lg border ${isCurrent ? 'bg-primary/5 border-primary/30' : 'border-white/5 bg-background'}`}>
                    <div className="flex flex-col">
                      <span className={`text-sm font-bold ${isCompleted ? 'text-white' : 'text-gray'}`}>{status}</span>
                      {historyEntry && (
                        <span className="text-xs text-gray mt-1">
                          {new Date(historyEntry.date).toLocaleDateString()} {new Date(historyEntry.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Vehicle Photos Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-surface border border-white/5 rounded-2xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-6 font-heading flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-primary" /> Vehicle Photos
        </h3>
        
        {booking.images && booking.images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {booking.images.map((img, idx) => (
              <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-white/10 relative group">
                <img 
                  src={`http://localhost:5000/uploads/${img}`} 
                  alt={`Vehicle photo ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray bg-background rounded-lg border border-white/5 border-dashed">
            No photos have been uploaded for this service yet.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CustomerBookingDetails;
