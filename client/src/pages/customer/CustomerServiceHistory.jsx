import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CarFront, Calendar as CalendarIcon, CheckCircle2, FileText, Wrench, History } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/axiosConfig';

const CustomerServiceHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await api.get('/customers/bookings');
        setHistory(data.filter(b => b.status === 'Delivered'));
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <div className="text-center mt-10 text-gray">Loading service history...</div>;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-heading text-white">Service History</h1>
        <p className="text-gray">View your past workshop visits and invoices.</p>
      </div>

      {history.length > 0 ? (
        <div className="space-y-4">
          {history.map((record, index) => (
            <motion.div
              key={record._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center shrink-0 border border-green-500/20">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{record.carBrand} {record.carModel}</h3>
                    <p className="text-gray text-sm">{record.registrationNumber}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-gray">
                    <Wrench className="w-4 h-4 text-primary" />
                    <span>{record.serviceType}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                    <span>Delivered on: {new Date(record.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Link 
                    to={`/customer/booking/${record._id}`}
                    className="flex-1 md:flex-none text-center bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                  >
                    View Details
                  </Link>
                  <button 
                    onClick={() => alert("Invoice download functionality coming soon!")}
                    className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                  >
                    <FileText className="w-4 h-4" /> Invoice
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-surface border border-white/5 rounded-2xl p-16 text-center">
          <History className="w-16 h-16 text-gray/30 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">No Service History</h2>
          <p className="text-gray mb-8">You haven't completed any services with us yet.</p>
        </div>
      )}
    </div>
  );
};

export default CustomerServiceHistory;
