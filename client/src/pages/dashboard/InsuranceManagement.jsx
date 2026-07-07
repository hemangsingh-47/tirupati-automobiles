import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, Filter, CarFront, FileText, Download, User } from 'lucide-react';
import api from '../../api/axiosConfig';

const STATUS_OPTIONS = [
  'Pending',
  'Documents Verified',
  'Quote Shared',
  'Customer Approved',
  'Policy Renewed',
  'Expired',
  'Cancelled'
];

const InsuranceManagement = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchRecords = async () => {
    try {
      const { data } = await api.get('/insurance/admin');
      setRecords(data);
    } catch (error) {
      console.error('Error fetching insurance records:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/insurance/admin/${id}/status`, { status: newStatus });
      fetchRecords(); // Refresh data
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update status');
    }
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.vehicleId?.registrationNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.customerId?.phone?.includes(searchTerm) ||
      record.customerId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.insuranceCompany?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || record.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Records', value: records.length, icon: FileText, color: 'text-blue-500' },
    { label: 'Pending Renewals', value: records.filter(r => r.status === 'Pending').length, icon: Shield, color: 'text-orange-500' },
    { label: 'Renewed', value: records.filter(r => r.status === 'Policy Renewed').length, icon: Shield, color: 'text-green-500' },
    { label: 'Expired', value: records.filter(r => r.status === 'Expired').length, icon: Shield, color: 'text-red-500' },
  ];

  if (loading) return <div className="text-gray text-center mt-10">Loading Insurance Records...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">Insurance Management</h1>
          <p className="text-gray text-sm">Manage renewals, view documents, and update policy status.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface border border-white/5 rounded-xl p-4 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray text-xs">{stat.label}</p>
              <h3 className="text-xl font-bold text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-white/5 rounded-2xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/5 flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 text-gray absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Vehicle No, Name, Phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-background border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-primary text-sm"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-auto bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary text-sm"
            >
              <option value="All">All Statuses</option>
              {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="p-4 text-sm font-bold text-gray uppercase tracking-wider">Vehicle</th>
                <th className="p-4 text-sm font-bold text-gray uppercase tracking-wider">Customer</th>
                <th className="p-4 text-sm font-bold text-gray uppercase tracking-wider">Policy Details</th>
                <th className="p-4 text-sm font-bold text-gray uppercase tracking-wider">Expiry</th>
                <th className="p-4 text-sm font-bold text-gray uppercase tracking-wider">Status</th>
                <th className="p-4 text-sm font-bold text-gray uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredRecords.map((record) => (
                <tr key={record._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <CarFront className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-white font-bold tracking-wide uppercase">{record.vehicleId?.registrationNumber}</p>
                        <p className="text-xs text-gray">{record.vehicleId?.brand} {record.vehicleId?.model}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    {record.customerId ? (
                      <div>
                        <p className="text-white font-medium">{record.customerId.name}</p>
                        <p className="text-xs text-gray">{record.customerId.phone}</p>
                      </div>
                    ) : (
                      <span className="text-gray text-xs italic">Guest</span>
                    )}
                  </td>
                  <td className="p-4">
                    <p className="text-white text-sm font-medium">{record.insuranceCompany}</p>
                    <p className="text-xs text-gray truncate max-w-[150px]" title={record.policyNumber}>{record.policyNumber}</p>
                  </td>
                  <td className="p-4">
                    <p className={`text-sm font-medium ${new Date(record.expiryDate) < new Date() ? 'text-red-500' : 'text-white'}`}>
                      {new Date(record.expiryDate).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="p-4">
                    <select
                      value={record.status}
                      onChange={(e) => handleStatusChange(record._id, e.target.value)}
                      className={`text-xs font-bold px-2 py-1 rounded-md border focus:outline-none 
                        ${record.status === 'Policy Renewed' ? 'bg-green-500/10 text-green-500 border-green-500/30' :
                          record.status === 'Expired' ? 'bg-red-500/10 text-red-500 border-red-500/30' :
                          'bg-primary/10 text-primary border-primary/30'}
                      `}
                    >
                      {STATUS_OPTIONS.map(opt => <option key={opt} value={opt} className="bg-background text-white">{opt}</option>)}
                    </select>
                  </td>
                  <td className="p-4 flex items-center gap-2">
                    {record.documentUrl && (
                      <a href={record.documentUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-md text-gray hover:text-white transition-colors" title="View Document">
                        <Download className="w-4 h-4" />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
              
              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray">
                    No insurance records found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InsuranceManagement;
