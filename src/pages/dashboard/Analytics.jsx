import { useState, useEffect } from 'react';
import { TrendingUp, Users, Wrench, CheckCircle } from 'lucide-react';
import api from '../../api/axiosConfig';

const Analytics = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get('/bookings?limit=1000');
        setBookings(data.bookings || data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Calculate metrics
  const totalBookings = bookings.length;
  const completedBookings = bookings.filter(b => b.status === 'Delivered').length;
  const inProgressBookings = totalBookings - completedBookings;
  
  // Calculate service popularity
  const serviceCounts = bookings.reduce((acc, booking) => {
    acc[booking.serviceType] = (acc[booking.serviceType] || 0) + 1;
    return acc;
  }, {});

  const popularServices = Object.entries(serviceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5); // Top 5

  // Calculate monthly bookings for chart
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentYear = new Date().getFullYear();
  
  const monthlyData = months.map((month, index) => {
    const count = bookings.filter(b => {
      const d = new Date(b.createdAt);
      return d.getMonth() === index && d.getFullYear() === currentYear;
    }).length;
    return { month, count };
  });
  
  const maxMonthly = Math.max(...monthlyData.map(d => d.count), 1); // Avoid div by 0

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-white">Workshop Analytics</h1>
        <p className="text-gray text-sm">Key performance metrics and insights for {currentYear}.</p>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-gray">Loading analytics...</div>
      ) : (
        <>
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
              <p className="text-gray text-sm mb-1">Total Bookings</p>
              <h3 className="text-3xl font-bold text-white font-heading">{totalBookings}</h3>
            </div>
            
            <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
                  <Users className="w-6 h-6" />
                </div>
              </div>
              <p className="text-gray text-sm mb-1">Unique Customers</p>
              <h3 className="text-3xl font-bold text-white font-heading">
                {new Set(bookings.map(b => b.phoneNumber)).size}
              </h3>
            </div>

            <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-orange-500/10 rounded-lg text-orange-500">
                  <Wrench className="w-6 h-6" />
                </div>
              </div>
              <p className="text-gray text-sm mb-1">In Progress</p>
              <h3 className="text-3xl font-bold text-white font-heading">{inProgressBookings}</h3>
            </div>

            <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </div>
              <p className="text-gray text-sm mb-1">Completed</p>
              <h3 className="text-3xl font-bold text-white font-heading">{completedBookings}</h3>
            </div>
          </div>

          {/* Monthly Bookings Chart (CSS Grid) */}
          <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl mb-8">
            <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">Monthly Bookings ({currentYear})</h3>
            <div className="h-64 flex items-end gap-2 sm:gap-4 mt-8">
              {monthlyData.map((data, index) => {
                const heightPercentage = (data.count / maxMonthly) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center group">
                    <div className="w-full flex justify-center mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs bg-white/10 text-white px-2 py-1 rounded">{data.count}</span>
                    </div>
                    <div className="w-full bg-background rounded-t-sm relative h-full flex items-end">
                      <div 
                        className="w-full bg-primary/80 hover:bg-primary transition-all duration-500 rounded-t-sm"
                        style={{ height: `${heightPercentage}%`, minHeight: data.count > 0 ? '4px' : '0' }}
                      ></div>
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray mt-2 rotate-45 sm:rotate-0 origin-left">{data.month}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Service Popularity */}
            <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">Most Popular Services</h3>
              {popularServices.length === 0 ? (
                <p className="text-gray text-sm">No data available yet.</p>
              ) : (
                <div className="space-y-4">
                  {popularServices.map(([service, count], index) => {
                    const percentage = Math.round((count / totalBookings) * 100);
                    return (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white font-medium">{service}</span>
                          <span className="text-gray">{count} bookings ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-background rounded-full h-2 border border-white/5 overflow-hidden">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* Recent Activity */}
            <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">Recent Activity</h3>
              <div className="space-y-4">
                {bookings.slice(0, 5).map((booking, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0"></div>
                    <div>
                      <p className="text-sm text-white">
                        <span className="font-bold">{booking.customerName}</span> booked <span className="text-primary">{booking.serviceType}</span>
                      </p>
                      <p className="text-xs text-gray mt-1">{new Date(booking.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
