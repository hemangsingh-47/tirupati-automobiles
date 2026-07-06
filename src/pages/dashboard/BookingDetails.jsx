import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, User, Car, Calendar as CalendarIcon, AlertCircle, Image as ImageIcon, History } from 'lucide-react';
import api from '../../api/axiosConfig';
import { useAuth } from '../../context/AuthContext';

const statuses = [
  'Booking Received',
  'Vehicle Received',
  'Inspection',
  'Waiting For Parts',
  'Repair Started',
  'Painting',
  'Quality Check',
  'Ready For Delivery',
  'Delivered'
];

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [booking, setBooking] = useState(null);
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const { data } = await api.get(`/bookings/${id}`);
        setBooking(data);
        setStatus(data.status);
      } catch (error) {
        console.error("Failed to fetch booking", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  const handleStatusUpdate = async () => {
    setIsSaving(true);
    try {
      const { data } = await api.patch(`/bookings/${id}/status`, { status, notes });
      setBooking(data);
      setNotes('');
      alert("Status updated successfully");
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update status");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center text-white">Loading...</div>;
  if (!booking) return <div className="p-8 text-center text-white">Booking not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 bg-surface border border-white/10 rounded-lg text-gray hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-3">
            Booking #{booking._id.slice(-6).toUpperCase()}
            <span className="text-xs px-2 py-1 bg-primary/20 text-primary border border-primary/20 rounded-full font-medium">
              {booking.status}
            </span>
          </h1>
          <p className="text-gray text-sm">Created on {new Date(booking.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center border-b border-white/10 pb-4">
              <User className="w-5 h-5 mr-2 text-primary" /> Customer Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray mb-1">Full Name</p>
                <p className="font-medium text-white">{booking.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray mb-1">Phone Number</p>
                <p className="font-medium text-white">{booking.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray mb-1">Email Address</p>
                <p className="font-medium text-white">{booking.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center border-b border-white/10 pb-4">
              <Car className="w-5 h-5 mr-2 text-primary" /> Vehicle Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray mb-1">Make & Model</p>
                <p className="font-medium text-white">{booking.carBrand} {booking.carModel}</p>
              </div>
              <div>
                <p className="text-sm text-gray mb-1">Registration</p>
                <p className="font-medium text-white uppercase">{booking.registrationNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray mb-1">Year</p>
                <p className="font-medium text-white">{booking.manufacturingYear}</p>
              </div>
              <div>
                <p className="text-sm text-gray mb-1">Fuel Type</p>
                <p className="font-medium text-white">{booking.fuelType}</p>
              </div>
              <div>
                <p className="text-sm text-gray mb-1">Service Type</p>
                <p className="font-medium text-white">{booking.serviceType}</p>
              </div>
            </div>
            
            {booking.problemDescription && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm text-gray mb-2">Problem Description</p>
                <div className="bg-background p-4 rounded-lg border border-white/5 text-gray-300 text-sm">
                  {booking.problemDescription}
                </div>
              </div>
            )}
          </div>

          {booking.images && booking.images.length > 0 && (
            <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center border-b border-white/10 pb-4">
                <ImageIcon className="w-5 h-5 mr-2 text-primary" /> Attached Images
              </h3>
              <div className="flex flex-wrap gap-4">
                {booking.images.map((img, idx) => (
                  <div key={idx} className="w-32 h-32 rounded-lg overflow-hidden border border-white/10">
                    <img src={`http://localhost:5000/uploads/${img}`} alt="Upload" className="w-full h-full object-cover hover:scale-110 transition-transform cursor-pointer" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline Section */}
          {booking.statusHistory && booking.statusHistory.length > 0 && (
            <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center border-b border-white/10 pb-4">
                <History className="w-5 h-5 mr-2 text-primary" /> Status Timeline
              </h3>
              
              <div className="relative border-l border-white/10 ml-3 space-y-8 mt-4">
                {booking.statusHistory.map((history, idx) => (
                  <div key={idx} className="relative pl-6">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1.5 ring-4 ring-background"></div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-white">{history.status}</span>
                        <span className="text-xs text-gray">{new Date(history.date).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray mb-2">{history.notes}</p>
                      <p className="text-xs font-medium text-primary">Updated by: {history.updatedBy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-6">
          <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center border-b border-white/10 pb-4">
              <AlertCircle className="w-5 h-5 mr-2 text-primary" /> Update Status
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray mb-2">Current Stage</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray mb-2">Notes (Optional)</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="3"
                  placeholder="e.g. Parts arrived, starting repair..."
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none text-sm"
                ></textarea>
              </div>
              
              <button 
                onClick={handleStatusUpdate}
                disabled={isSaving || (status === booking.status && !notes)}
                className="w-full bg-primary text-background font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Updating...' : 'Save Update'}
              </button>
            </div>
          </div>

          <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center border-b border-white/10 pb-4">
              <CalendarIcon className="w-5 h-5 mr-2 text-primary" /> Appointment
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray">Preferred Date</p>
                  <p className="text-sm font-medium text-white">{new Date(booking.preferredDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray">Preferred Time</p>
                  <p className="text-sm font-medium text-white">{booking.preferredTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
