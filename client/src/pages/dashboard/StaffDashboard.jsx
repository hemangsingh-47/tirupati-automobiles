import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wrench, CheckCircle, Clock } from 'lucide-react';
import api from '../../api/axiosConfig';
import { useAuth } from '../../context/AuthContext';

const StaffDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    pending: 0,
    inProgress: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/bookings');
        
        const pending = data.filter(b => b.status === 'Booking Received' || b.status === 'Vehicle Received').length;
        const inProgress = data.filter(b => b.status === 'Inspection' || b.status === 'Repair Started' || b.status === 'Painting').length;
        
        setStats({ pending, inProgress });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">Staff Workspace</h1>
          <p className="text-gray text-sm">Hello, {user?.name}. Here are your tasks for today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface p-6 rounded-2xl border border-white/5"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-gray text-sm font-medium mb-1">Pending Check-in</h3>
          <p className="text-3xl font-bold text-white">{stats.pending}</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface p-6 rounded-2xl border border-white/5"
        >
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-4">
            <Wrench className="w-6 h-6" />
          </div>
          <h3 className="text-gray text-sm font-medium mb-1">Active Repairs</h3>
          <p className="text-3xl font-bold text-white">{stats.inProgress}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface p-6 rounded-2xl border border-white/5"
        >
          <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 mb-4">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h3 className="text-gray text-sm font-medium mb-1">Quality Check Ready</h3>
          <p className="text-3xl font-bold text-white">0</p>
        </motion.div>
      </div>
    </div>
  );
};

export default StaffDashboard;
