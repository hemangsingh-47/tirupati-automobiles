import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User, Lock, Mail, Phone, ArrowRight, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCustomerAuth } from '../../context/CustomerAuthContext';

const CustomerRegister = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { register: registerCustomer, customer } = useCustomerAuth();

  useEffect(() => {
    if (customer) {
      navigate('/customer/dashboard');
    }
  }, [customer, navigate]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setAuthError('');
    try {
      await registerCustomer({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password
      });
      navigate('/customer/dashboard');
    } catch (error) {
      setAuthError(
        error.response?.data?.message || 'Failed to register. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const password = watch('password');

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-yellow-600/10 rounded-full blur-[100px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-surface border border-white/5 rounded-2xl p-8 relative z-10 shadow-2xl my-8"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
            <UserPlus className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold font-heading text-white">Create Account</h2>
          <p className="text-gray text-sm mt-2">Join Tirupati Automobiles Portal</p>
        </div>

        {authError && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                placeholder="John Doe"
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
                placeholder="john@example.com"
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
                placeholder="9876543210"
              />
            </div>
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray" />
              </div>
              <input 
                type="password"
                {...register("password", { 
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" }
                })}
                className="w-full bg-background border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                placeholder="Create a password"
              />
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray mb-2">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray" />
              </div>
              <input 
                type="password"
                {...register("confirmPassword", { 
                  validate: value => value === password || "Passwords do not match"
                })}
                className="w-full bg-background border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                placeholder="Confirm your password"
              />
            </div>
            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-background font-bold px-4 py-3 rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
          >
            {isSubmitting ? 'Creating account...' : (
              <>
                Register <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/5 text-center">
          <p className="text-gray text-sm">
            Already have an account?{' '}
            <Link to="/customer/login" className="text-primary hover:underline font-medium inline-flex items-center gap-1">
               Sign in here
            </Link>
          </p>
          <div className="mt-4">
            <Link to="/" className="text-gray text-xs hover:text-white transition-colors">
              &larr; Back to Website
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerRegister;
