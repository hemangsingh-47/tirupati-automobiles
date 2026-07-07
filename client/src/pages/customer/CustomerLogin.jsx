import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CarFront, Lock, Mail, ArrowRight, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCustomerAuth } from '../../context/CustomerAuthContext';

const CustomerLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login, customer } = useCustomerAuth();

  useEffect(() => {
    if (customer) {
      navigate('/customer/dashboard');
    }
  }, [customer, navigate]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setAuthError('');
    try {
      await login(data.email, data.password);
      navigate('/customer/dashboard');
    } catch (error) {
      setAuthError(
        error.response?.data?.message || 'Failed to login. Please check your credentials.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-yellow-600/10 rounded-full blur-[100px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface border border-white/5 rounded-2xl p-8 relative z-10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
            <CarFront className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold font-heading text-white">Customer Portal</h2>
          <p className="text-gray text-sm mt-2">Sign in to manage your vehicle services</p>
        </div>

        {authError && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray" />
              </div>
              <input 
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full bg-background border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                placeholder="Enter your password"
              />
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-background font-bold px-4 py-3 rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? 'Signing in...' : (
              <>
                Sign In <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/5 text-center">
          <p className="text-gray text-sm">
            Don't have an account?{' '}
            <Link to="/customer/register" className="text-primary hover:underline font-medium inline-flex items-center gap-1">
               Register here <UserPlus className="w-4 h-4" />
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

export default CustomerLogin;
