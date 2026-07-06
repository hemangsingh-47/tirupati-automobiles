import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Auto redirect if already logged in (Bug 6)
  useEffect(() => {
    if (!loading && user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/staff/dashboard');
      }
    }
  }, [user, loading, navigate]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const loggedUser = await login(data.email, data.password);
      if (loggedUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/staff/dashboard');
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface border border-white/5 p-8 rounded-2xl shadow-2xl z-10"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-heading font-bold text-white mb-2">
            <span className="text-primary">TAS</span> Workspace
          </h1>
          <p className="text-gray text-sm">Sign in to manage the workshop</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 font-medium text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray mb-2">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full bg-background border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                placeholder="admin@tirupatiautomobiles.com"
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray mb-2">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full bg-background border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-background font-bold px-4 py-3 rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? 'Signing In...' : (
              <>
                Sign In
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
