import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CarFront, Shield, Plus, Clock, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../../api/axiosConfig';

const MyVehicles = () => {
  const [insuranceRecords, setInsuranceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsurance = async () => {
      try {
        const { data } = await api.get('/insurance/customer');
        setInsuranceRecords(data);
      } catch (error) {
        console.error('Error fetching insurance:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInsurance();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Policy Renewed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Expired': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  const calculateDaysLeft = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (loading) return <div className="text-gray text-center mt-10">Loading Vehicles...</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">My Vehicles & Insurance</h1>
          <p className="text-gray">Manage your vehicles, track insurance renewals and claim history.</p>
        </div>
        <Link 
          to="/customer/insurance/renew" 
          className="bg-primary text-background font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Vehicle / Renew
        </Link>
      </div>

      {insuranceRecords.length === 0 ? (
        <div className="bg-surface border border-white/5 rounded-2xl p-12 text-center">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <CarFront className="w-10 h-10 text-gray" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Vehicles Found</h3>
          <p className="text-gray mb-6 max-w-md mx-auto">Add your vehicle by submitting an insurance renewal request. We will keep track of your policy and service history automatically.</p>
          <Link to="/customer/insurance/renew" className="inline-flex items-center gap-2 bg-primary text-background font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors">
            <Shield className="w-5 h-5" /> Add Insurance Details
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insuranceRecords.map((record) => {
            const daysLeft = calculateDaysLeft(record.expiryDate);
            let expiryState = null;
            
            if (record.status !== 'Policy Renewed' && record.status !== 'Cancelled') {
              if (daysLeft < 0) expiryState = { text: 'Expired', color: 'text-red-500' };
              else if (daysLeft <= 30) expiryState = { text: `Expires in ${daysLeft} days`, color: 'text-orange-500' };
            }

            return (
              <motion.div
                key={record._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <CarFront className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                        {record.vehicleId?.registrationNumber}
                      </h3>
                      <p className="text-gray text-sm">
                        {record.vehicleId?.brand} {record.vehicleId?.model}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray text-sm flex items-center gap-2"><Shield className="w-4 h-4"/> Insurance Co</span>
                    <span className="text-white font-medium">{record.insuranceCompany}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray text-sm flex items-center gap-2"><FileText className="w-4 h-4"/> Policy No</span>
                    <span className="text-white font-medium">{record.policyNumber}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray text-sm flex items-center gap-2"><Clock className="w-4 h-4"/> Expiry Date</span>
                    <div className="text-right">
                      <span className="text-white font-medium block">{new Date(record.expiryDate).toLocaleDateString()}</span>
                      {expiryState && <span className={`text-xs font-bold ${expiryState.color}`}>{expiryState.text}</span>}
                    </div>
                  </div>
                </div>

                <Link 
                  to={`/customer/vehicle/${record.vehicleId?._id}`}
                  className="w-full inline-flex justify-center items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-medium px-4 py-3 rounded-lg border border-white/10 transition-colors"
                >
                  View Full Profile
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyVehicles;
