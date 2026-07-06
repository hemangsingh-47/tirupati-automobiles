import { useState, useEffect } from 'react';
import { Search, User, Car, Calendar, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/axiosConfig';

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndGroupCustomers = async () => {
      try {
        const { data } = await api.get('/bookings?limit=1000'); // Fetch a large limit for customer grouping
        const bookingsList = data.bookings || data;
        
        // Group bookings by phone number
        const grouped = bookingsList.reduce((acc, booking) => {
          const phone = booking.phoneNumber;
          if (!acc[phone]) {
            acc[phone] = {
              name: booking.customerName,
              phone: booking.phoneNumber,
              email: booking.email,
              vehicles: new Set([`${booking.carBrand} ${booking.carModel}`]),
              visits: 1,
              lastVisit: new Date(booking.createdAt)
            };
          } else {
            acc[phone].vehicles.add(`${booking.carBrand} ${booking.carModel}`);
            acc[phone].visits += 1;
            const bookingDate = new Date(booking.createdAt);
            if (bookingDate > acc[phone].lastVisit) {
              acc[phone].lastVisit = bookingDate;
            }
          }
          return acc;
        }, {});

        // Convert grouped object to array and convert Sets to Arrays
        const customersArray = Object.values(grouped).map(c => ({
          ...c,
          vehicles: Array.from(c.vehicles)
        })).sort((a, b) => b.lastVisit - a.lastVisit); // Sort by most recent visit

        setCustomers(customersArray);
      } catch (error) {
        console.error("Failed to fetch customers", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndGroupCustomers();
  }, []);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">Customers Directory</h1>
          <p className="text-gray text-sm">Automatically generated from booking history.</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray" />
          <input 
            type="text" 
            placeholder="Search by name or phone..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full p-8 text-center text-gray">Loading customers...</div>
        ) : filteredCustomers.length === 0 ? (
          <div className="col-span-full p-8 text-center text-gray">No customers found.</div>
        ) : (
          filteredCustomers.map((customer, index) => (
            <Link to={`/admin/customers/${encodeURIComponent(customer.phone)}`} key={index} className="block">
              <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl hover:border-primary/50 transition-colors h-full">
                <div className="flex items-start gap-4 mb-6 border-b border-white/10 pb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{customer.name}</h3>
                  <p className="text-sm text-gray flex items-center gap-1 mt-1">
                    <Phone className="w-3 h-3" /> {customer.phone}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Car className="w-4 h-4 text-gray mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-gray mb-1">Vehicles ({customer.vehicles.length})</p>
                    <div className="flex flex-wrap gap-2">
                      {customer.vehicles.map((v, i) => (
                        <span key={i} className="text-xs font-medium px-2 py-1 bg-white/5 text-white rounded border border-white/10">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t border-white/5">
                  <div>
                    <p className="text-xs text-gray mb-1">Total Visits</p>
                    <p className="text-sm font-bold text-primary">{customer.visits}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray mb-1">Last Visit</p>
                    <p className="text-sm font-medium text-white flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gray" />
                      {customer.lastVisit.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomersList;
