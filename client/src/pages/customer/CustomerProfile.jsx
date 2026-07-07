import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCustomerAuth } from '../../context/CustomerAuthContext';
import { User, Mail, Phone, MapPin, Lock, Save, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const CustomerProfile = () => {
  const { customer, updateProfile } = useCustomerAuth();
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    defaultValues: {
      name: customer?.name || '',
      email: customer?.email || '',
      phone: customer?.phone || '',
      address: customer?.address || '',
      profilePicture: customer?.profilePicture || ''
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      await updateProfile(data);
      setSuccessMsg('Profile updated successfully!');
      if (data.password) {
        reset({ ...data, password: '', confirmPassword: '' });
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const password = watch('password');

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-white">My Profile</h1>
        <p className="text-gray">Manage your account information and preferences.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface border border-white/5 rounded-2xl p-6 md:p-8"
      >
        {successMsg && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Picture URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray mb-2">Profile Picture URL</label>
              <div className="relative">
                <input 
                  type="text"
                  {...register("profilePicture")}
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray" />
                </div>
                <input 
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="w-full bg-background border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
              </div>
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray" />
                </div>
                <input 
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" }
                  })}
                  className="w-full bg-background border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray mb-2">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray" />
                </div>
                <input 
                  type="tel"
                  {...register("phone", { 
                    required: "Phone number is required",
                    pattern: { value: /^[0-9]{10}$/, message: "Must be exactly 10 digits" }
                  })}
                  className="w-full bg-background border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
              </div>
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray mb-2">Full Address</label>
              <div className="relative">
                <div className="absolute top-3 left-4 pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray" />
                </div>
                <textarea 
                  {...register("address")}
                  rows="3"
                  className="w-full bg-background border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                  placeholder="Your residential address"
                ></textarea>
              </div>
            </div>

            <div className="md:col-span-2 mt-6 mb-2 border-t border-white/5 pt-6">
              <h3 className="text-lg font-bold text-white">Change Password</h3>
              <p className="text-gray text-xs mt-1">Leave blank if you do not want to change your password.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray mb-2">New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray" />
                </div>
                <input 
                  type="password"
                  {...register("password", { 
                    minLength: { value: 6, message: "Minimum 6 characters" }
                  })}
                  className="w-full bg-background border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray mb-2">Confirm New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray" />
                </div>
                <input 
                  type="password"
                  {...register("confirmPassword", { 
                    validate: value => !password || value === password || "Passwords do not match"
                  })}
                  className="w-full bg-background border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-background font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              <Save className="w-5 h-5" />
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CustomerProfile;
