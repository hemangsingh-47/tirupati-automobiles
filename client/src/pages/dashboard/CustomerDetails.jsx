import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Phone, Mail, Car, Calendar as CalendarIcon, History, Eye } from 'lucide-react';
import api from '../../api/axiosConfig';
import { useAuth } from '../../context/AuthContext';

const CustomerDetails = () => {
  const { phone } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerHistory = async () => {
      try {
        // Fetch bookings matching this phone number
        // We use the search query param since it checks phone numbers
        const { data } = await api.get(`/bookings?search=${encodeURIComponent(phone)}&limit=100`);
        const customerBookings = (data.bookings || data).filter(b => b.phoneNumber === phone);
        setBookings(customerBookings);
      } catch (error) {
        console.error("Failed to fetch customer details", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomerHistory();
  }, [phone]);

  if (isLoading) return <div className="p-8 text-center text-white">Loading...</div>;
  if (!bookings || bookings.length === 0) return <div className="p-8 text-center text-white">Customer not found</div>;

  // Aggregate Customer Data
  const customer = {
    name: bookings[0].customerName,
    phone: bookings[0].phoneNumber,
    email: bookings[0].email,
    uniqueVehicles: Array.from(new Set(bookings.map(b => `${b.carBrand} ${b.carModel} (${b.registrationNumber})`))),
    totalVisits: bookings.length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 bg-surface border border-white/10 rounded-lg text-gray hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">Customer Profile</h1>
          <p className="text-gray text-sm">Detailed view of customer history and vehicles.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="space-y-6">
          <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl">
            <div className="flex flex-col items-center text-center mb-6 border-b border-white/10 pb-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 mb-4">
                <User className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold text-white">{customer.name}</h2>
              <span className="inline-flex mt-2 px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                VIP Customer
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray" />
                <span className="text-white font-medium">{customer.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray" />
                <span className="text-white font-medium">{customer.email}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white/5 rounded-xl border border-white/5">
                <p className="text-xs text-gray mb-1">Total Visits</p>
                <p className="text-2xl font-bold text-primary font-heading">{customer.totalVisits}</p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-xl border border-white/5">
                <p className="text-xs text-gray mb-1">Vehicles</p>
                <p className="text-2xl font-bold text-primary font-heading">{customer.uniqueVehicles.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Car className="w-5 h-5 mr-2 text-primary" /> Known Vehicles
            </h3>
            <ul className="space-y-3">
              {customer.uniqueVehicles.map((v, i) => (
                <li key={i} className="p-3 bg-background border border-white/10 rounded-lg text-sm text-white font-medium">
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* History Timeline */}
        <div className="lg:col-span-2">
          <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl h-full">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center border-b border-white/10 pb-4">
              <History className="w-5 h-5 mr-2 text-primary" /> Service History
            </h3>
            
            <div className="relative border-l border-white/10 ml-3 space-y-8 mt-4">
              {bookings.map((booking) => (
                <div key={booking._id} className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1.5 ring-4 ring-background"></div>
                  <div className="bg-white/5 p-5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-white text-lg">{booking.serviceType}</h4>
                        <p className="text-sm text-gray flex items-center mt-1">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Link 
                        to={`/${user?.role}/bookings/${booking._id}`}
                        className="inline-flex items-center justify-center p-2 bg-primary/10 text-primary hover:bg-primary hover:text-background rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-gray mb-1">Vehicle</p>
                        <p className="text-sm text-white font-medium">{booking.carBrand} {booking.carModel}</p>
                        <p className="text-xs text-gray uppercase">{booking.registrationNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray mb-1">Final Status</p>
                        <span className="inline-flex px-2 py-1 rounded text-xs font-medium border bg-white/10 text-white border-white/20">
                          {booking.status}
                        </span>
                      </div>
                    </div>

                    {booking.problemDescription && (
                      <div className="mt-4 pt-4 border-t border-white/5 text-sm text-gray">
                        <span className="font-medium text-white">Reported Issue: </span>
                        {booking.problemDescription}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
