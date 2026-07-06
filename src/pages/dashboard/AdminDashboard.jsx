import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Calendar, Wrench, CheckCircle, TrendingUp, Plus, Image as ImageIcon, Star, Settings } from 'lucide-react';
import api from '../../api/axiosConfig';

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-surface p-6 rounded-2xl border border-white/5 shadow-2xl"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <span className="flex items-center text-sm font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-md">
          <TrendingUp className="w-4 h-4 mr-1" /> {trend}
        </span>
      )}
    </div>
    <h3 className="text-gray text-sm font-medium mb-1">{title}</h3>
    <p className="text-3xl font-bold text-white font-heading">{value}</p>
  </motion.div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pending: 0,
    inProgress: 0,
    deliveredToday: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/bookings?limit=1000'); // Fetch a large limit to calculate stats
        const bookingsList = data.bookings || data;
        
        const pending = bookingsList.filter(b => b.status === 'Booking Received' || b.status === 'Inspection').length;
        const inProgress = bookingsList.filter(b => b.status === 'Waiting For Parts' || b.status === 'Repair Started' || b.status === 'Painting').length;
        
        setStats({
          totalBookings: data.totalRecords || bookingsList.length,
          pending,
          inProgress,
          deliveredToday: bookingsList.filter(b => b.status === 'Delivered').length
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };
    
    // Initial fetch
    fetchStats();

    // Poll every 30 seconds for Live Dashboard (Bug 4)
    const intervalId = setInterval(fetchStats, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  const QUICK_ACTIONS = [
    { title: "View Bookings", icon: Calendar, path: "/admin/bookings", color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Manage Customers", icon: Users, path: "/admin/customers", color: "text-green-500", bg: "bg-green-500/10" },
    { title: "Upload to Gallery", icon: ImageIcon, path: "/admin/gallery", color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Moderate Reviews", icon: Star, path: "/admin/reviews", color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { title: "View Analytics", icon: TrendingUp, path: "/admin/analytics", color: "text-orange-500", bg: "bg-orange-500/10" },
    { title: "Workshop Settings", icon: Settings, path: "/admin/settings", color: "text-gray", bg: "bg-white/10" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">Owner Overview</h1>
          <p className="text-gray text-sm">Welcome back! Here's what's happening at the workshop today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Bookings" value={stats.totalBookings} icon={Calendar} trend="+12%" />
        <StatCard title="Pending Vehicles" value={stats.pending} icon={Users} />
        <StatCard title="In Progress" value={stats.inProgress} icon={Wrench} />
        <StatCard title="Total Delivered" value={stats.deliveredToday} icon={CheckCircle} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-white mb-6 font-heading">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {QUICK_ACTIONS.map((action, idx) => (
            <Link 
              key={idx} 
              to={action.path}
              className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl hover:bg-white/5 transition-colors flex flex-col items-center text-center group"
            >
              <div className={`w-12 h-12 rounded-full ${action.bg} ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-white">{action.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
