import { useState, useEffect, useCallback } from 'react';
import { Search, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { useAuth } from '../../context/AuthContext';
import Pagination from '../../components/common/Pagination';
import Filter from '../../components/common/Filter';

const FILTER_CONFIG = [
  {
    id: 'status',
    label: 'Booking Status',
    options: [
      { value: 'Booking Received', label: 'Booking Received' },
      { value: 'Vehicle Received', label: 'Vehicle Received' },
      { value: 'Inspection', label: 'Inspection' },
      { value: 'Repair Started', label: 'Repair Started' },
      { value: 'Painting', label: 'Painting' },
      { value: 'Quality Check', label: 'Quality Check' },
      { value: 'Ready For Delivery', label: 'Ready For Delivery' },
      { value: 'Delivered', label: 'Delivered' }
    ]
  },
  {
    id: 'serviceType',
    label: 'Service Type',
    options: [
      { value: 'General Service', label: 'General Service' },
      { value: 'Engine Repair', label: 'Engine Repair' },
      { value: 'Denting', label: 'Denting' },
      { value: 'Painting', label: 'Painting' },
      { value: 'Body Shop', label: 'Body Shop' },
      { value: 'Insurance Claim', label: 'Insurance Claim' }
    ]
  }
];

const BookingsList = () => {
  const { user } = useAuth();
  
  // State
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination & Filter State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    status: '',
    serviceType: ''
  });

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    try {
      // Build query string
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10
      });
      
      if (searchTerm) params.append('search', searchTerm);
      if (activeFilters.status) params.append('status', activeFilters.status);
      if (activeFilters.serviceType) params.append('serviceType', activeFilters.serviceType);

      const { data } = await api.get(`/bookings?${params.toString()}`);
      
      setBookings(data.bookings || data); // Fallback to raw data if old backend
      setCurrentPage(data.currentPage || 1);
      setTotalPages(data.totalPages || 1);
      setTotalRecords(data.totalRecords || data.length);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchTerm, activeFilters]);

  useEffect(() => {
    // Debounce search slightly
    const delayDebounceFn = setTimeout(() => {
      fetchBookings();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [fetchBookings]);

  const handleFilterChange = (id, value) => {
    setActiveFilters(prev => ({ ...prev, [id]: value }));
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  const clearFilters = () => {
    setActiveFilters({ status: '', serviceType: '' });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Booking Received': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Vehicle Received': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Inspection': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'Repair Started': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'Ready For Delivery': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Delivered': return 'bg-gray-500/10 text-gray border-gray-500/20';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">Bookings Management</h1>
          <p className="text-gray text-sm">
            Showing {bookings.length} of {totalRecords} bookings.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray" />
            <input 
              type="text" 
              placeholder="Search bookings..." 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-surface border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
          </div>
          
          <Filter 
            filters={FILTER_CONFIG}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />
        </div>
      </div>

      <div className="bg-surface border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="p-4 text-xs font-semibold text-gray uppercase tracking-wider">ID</th>
                <th className="p-4 text-xs font-semibold text-gray uppercase tracking-wider">Customer</th>
                <th className="p-4 text-xs font-semibold text-gray uppercase tracking-wider">Vehicle</th>
                <th className="p-4 text-xs font-semibold text-gray uppercase tracking-wider">Service</th>
                <th className="p-4 text-xs font-semibold text-gray uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-semibold text-gray uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-semibold text-gray uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray">No bookings found.</td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 text-sm font-mono text-gray">#{booking._id.slice(-6).toUpperCase()}</td>
                    <td className="p-4">
                      <p className="text-sm font-medium text-white">{booking.customerName}</p>
                      <p className="text-xs text-gray">{booking.phoneNumber}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-white">{booking.carBrand} {booking.carModel}</p>
                      <p className="text-xs text-gray uppercase">{booking.registrationNumber}</p>
                    </td>
                    <td className="p-4 text-sm text-gray">{booking.serviceType}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-medium border ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-white">{new Date(booking.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td className="p-4 text-right">
                      <Link 
                        to={`/${user?.role}/bookings/${booking._id}`}
                        className="inline-flex items-center justify-center p-2 bg-primary/10 text-primary hover:bg-primary hover:text-background rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default BookingsList;
