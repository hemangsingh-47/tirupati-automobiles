import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../api/axiosConfig';
import { CarFront, Shield, FileText, Clock, CheckCircle, ArrowLeft, Calendar } from 'lucide-react';

const VehicleProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get(`/insurance/vehicles/${id}`);
        setProfile(data);
      } catch (error) {
        console.error('Error fetching vehicle profile:', error);
        navigate('/customer/vehicles');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id, navigate]);

  if (loading) return <div className="text-gray text-center mt-10">Loading Profile...</div>;
  if (!profile?.vehicle) return <div className="text-gray text-center mt-10">Vehicle not found</div>;

  const { vehicle, insuranceRecords, bookings } = profile;
  const currentInsurance = insuranceRecords[0]; // Most recent

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link to="/customer/vehicles" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">{vehicle.registrationNumber}</h1>
          <p className="text-gray">{vehicle.brand} {vehicle.model} {vehicle.manufacturingYear ? `(${vehicle.manufacturingYear})` : ''}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Insurance Details */}
        <div className="bg-surface border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-white font-heading">Current Policy</h2>
            </div>
            <Link to="/customer/insurance/renew" className="text-primary text-sm hover:underline">Renew / Update</Link>
          </div>
          
          {currentInsurance ? (
            <div className="space-y-4">
              <div>
                <p className="text-gray text-sm">Insurance Company</p>
                <p className="text-white font-medium">{currentInsurance.insuranceCompany}</p>
              </div>
              <div>
                <p className="text-gray text-sm">Policy Number</p>
                <p className="text-white font-medium">{currentInsurance.policyNumber}</p>
              </div>
              <div>
                <p className="text-gray text-sm">Expiry Date</p>
                <p className="text-white font-medium">{new Date(currentInsurance.expiryDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray text-sm">Status</p>
                <span className="inline-block mt-1 px-3 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-full text-xs font-bold">
                  {currentInsurance.status}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray text-sm">No insurance records found. Please update your policy details.</p>
          )}
        </div>

        {/* Vehicle Specs */}
        <div className="bg-surface border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <CarFront className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-white font-heading">Specifications</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray text-sm">Brand</p>
              <p className="text-white font-medium">{vehicle.brand}</p>
            </div>
            <div>
              <p className="text-gray text-sm">Model</p>
              <p className="text-white font-medium">{vehicle.model}</p>
            </div>
            <div>
              <p className="text-gray text-sm">Fuel Type</p>
              <p className="text-white font-medium">{vehicle.fuelType || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray text-sm">Added On</p>
              <p className="text-white font-medium">{new Date(vehicle.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Claim / Service History */}
      <div className="bg-surface border border-white/5 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-white font-heading">Service & Claim History</h2>
        </div>

        {bookings.length === 0 ? (
          <p className="text-gray text-sm">No past services or claims found for this vehicle.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Link 
                key={booking._id} 
                to={`/customer/booking/${booking._id}`}
                className="block bg-background border border-white/5 rounded-xl p-4 hover:border-primary/50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-bold mb-1">{booking.serviceType}</h4>
                    <p className="text-gray text-sm flex items-center gap-2">
                      <Calendar className="w-3 h-3" /> {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-white/5 text-gray rounded text-xs font-bold uppercase">
                    {booking.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleProfile;
