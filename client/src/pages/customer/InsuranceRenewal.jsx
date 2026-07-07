import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import api from '../../api/axiosConfig';
import { CarFront, Shield, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

const InsuranceRenewal = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError('');
    try {
      await api.post('/insurance/renew', data);
      setSuccess(true);
      setTimeout(() => {
        navigate('/customer/vehicles');
      }, 3000);
    } catch (error) {
      setServerError(error.response?.data?.message || 'An error occurred while submitting.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto bg-surface border border-white/5 rounded-2xl p-12 text-center">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold font-heading text-white mb-4">Request Submitted!</h2>
        <p className="text-gray mb-8">
          Your insurance renewal request has been received. Our team will verify your details and share the best quote with you shortly.
        </p>
        <p className="text-sm text-gray/50">Redirecting to your vehicles...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-white">Insurance Renewal</h1>
        <p className="text-gray">Submit your vehicle and current policy details for a quick renewal quote.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {serverError && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{serverError}</p>
          </div>
        )}

        {/* Vehicle Details */}
        <div className="bg-surface border border-white/5 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <CarFront className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-white font-heading">Vehicle Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray mb-2">Registration Number *</label>
              <input
                {...register("registrationNumber", { required: "Registration Number is required" })}
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary uppercase"
                placeholder="e.g. MH 01 AB 1234"
              />
              {errors.registrationNumber && <span className="text-red-500 text-xs mt-1">{errors.registrationNumber.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray mb-2">Vehicle Brand *</label>
              <input
                {...register("brand", { required: "Brand is required" })}
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                placeholder="e.g. Maruti Suzuki"
              />
              {errors.brand && <span className="text-red-500 text-xs mt-1">{errors.brand.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray mb-2">Vehicle Model *</label>
              <input
                {...register("model", { required: "Model is required" })}
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                placeholder="e.g. Swift Dzire"
              />
              {errors.model && <span className="text-red-500 text-xs mt-1">{errors.model.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray mb-2">Manufacturing Year</label>
              <input
                type="number"
                {...register("manufacturingYear")}
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                placeholder="e.g. 2019"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray mb-2">Fuel Type</label>
              <select
                {...register("fuelType")}
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
              >
                <option value="">Select Fuel Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
          </div>
        </div>

        {/* Insurance Details */}
        <div className="bg-surface border border-white/5 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-white font-heading">Current Insurance Details</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray mb-2">Insurance Company *</label>
              <input
                {...register("insuranceCompany", { required: "Insurance Company is required" })}
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                placeholder="e.g. HDFC Ergo, ICICI Lombard"
              />
              {errors.insuranceCompany && <span className="text-red-500 text-xs mt-1">{errors.insuranceCompany.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray mb-2">Policy Number *</label>
              <input
                {...register("policyNumber", { required: "Policy Number is required" })}
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                placeholder="Enter current policy number"
              />
              {errors.policyNumber && <span className="text-red-500 text-xs mt-1">{errors.policyNumber.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray mb-2">Expiry Date *</label>
              <input
                type="date"
                {...register("expiryDate", { required: "Expiry Date is required" })}
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary [color-scheme:dark]"
              />
              {errors.expiryDate && <span className="text-red-500 text-xs mt-1">{errors.expiryDate.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray mb-2">Upload Policy Document (URL)</label>
              <input
                {...register("documentUrl")}
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                placeholder="Link to PDF/Image (Optional)"
              />
              <p className="text-xs text-gray mt-1">If you have the document on Google Drive/Cloud, paste the link here.</p>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-white/5 rounded-2xl p-6 md:p-8">
          <label className="block text-sm font-medium text-gray mb-2">Additional Notes</label>
          <textarea
            {...register("notes")}
            className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary h-32 resize-none"
            placeholder="Any specific coverage requirements or claims made in the last year?"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-background font-bold text-lg px-8 py-4 rounded-xl hover:bg-yellow-500 transition-colors shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? 'Submitting...' : (
            <>
              Submit Renewal Request <FileText className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InsuranceRenewal;
