import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import { reviewService } from '../services/review.service';

const SubmitReview = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      await reviewService.createReview({
        customerName: data.customerName,
        comment: data.comment,
        rating: rating
      });
      setIsSuccess(true);
      reset();
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <PageHero 
        title="Share Your Experience" 
        description="Your feedback helps us maintain our standard of excellence and helps other car owners make informed decisions."
        image="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      />

      <section className="py-24 bg-background min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface border border-white/5 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-yellow-600"></div>
            
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white font-heading mb-4">Thank You for Your Review!</h3>
                <p className="text-gray mb-8">
                  Your feedback has been successfully submitted and is pending approval by our team. It will appear on our website shortly.
                </p>
                <Link 
                  to="/"
                  className="bg-primary text-background font-bold px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors inline-flex items-center gap-2"
                >
                  Back to Home
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-10 text-center">
                  <h2 className="text-3xl font-bold text-white font-heading mb-4">Leave a Review</h2>
                  <p className="text-gray text-sm">How was your experience at Tirupati Automobiles?</p>
                </div>

                {errorMsg && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Star Rating System */}
                  <div className="flex flex-col items-center mb-8">
                    <label className="block text-sm font-medium text-gray mb-4 text-center">Rate your experience</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star 
                            className={`w-10 h-10 transition-colors ${
                              star <= (hoverRating || rating)
                                ? 'fill-primary text-primary' 
                                : 'text-white/20 hover:text-white/40'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray mb-2">Your Full Name</label>
                    <input 
                      type="text"
                      {...register("customerName", { required: "Name is required" })}
                      className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      placeholder="Rahul Sharma"
                    />
                    {errors.customerName && <p className="text-red-400 text-xs mt-1">{errors.customerName.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray mb-2">Your Review</label>
                    <textarea 
                      {...register("comment", { 
                        required: "Review comment is required",
                        minLength: { value: 10, message: "Review must be at least 10 characters long" }
                      })}
                      rows="5"
                      className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                      placeholder="Tell us about your experience..."
                    ></textarea>
                    {errors.comment && <p className="text-red-400 text-xs mt-1">{errors.comment.message}</p>}
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-background font-bold px-4 py-4 rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 mt-8 text-lg"
                  >
                    {isSubmitting ? 'Submitting...' : (
                      <>
                        Submit Review
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default SubmitReview;
