import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/axiosConfig';

const defaultTestimonials = [
  {
    customerName: 'Rahul Sharma',
    role: 'Audi A6 Owner',
    comment: 'The level of professionalism at Tirupati Automobiles is unmatched. They handled my accident repair seamlessly and the insurance claim was entirely hassle-free. Highly recommended.',
    rating: 5
  },
  {
    customerName: 'Priya Desai',
    role: 'Hyundai Creta Owner',
    comment: 'I have been bringing my car here for general servicing for two years. The transparent pricing and genuine parts give me peace of mind. The staff is extremely courteous and knowledgeable.',
    rating: 5
  },
  {
    customerName: 'Vikram Singh',
    role: 'Toyota Fortuner Owner',
    comment: 'Excellent denting and painting work. My Fortuner looks brand new after the paint job. They have state-of-the-art equipment and the turnaround time was surprisingly fast.',
    rating: 5
  }
];

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await api.get('/reviews');
        if (data && data.length > 0) {
          setReviews(data);
        } else {
          setReviews(defaultTestimonials);
        }
      } catch (error) {
        setReviews(defaultTestimonials);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <section className="py-24 bg-surface border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block"
          >
            Testimonials
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-heading font-bold text-white mb-8"
          >
            What Our Customers Say
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              to="/submit-review"
              className="inline-flex items-center gap-2 bg-primary text-background font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors shadow-xl"
            >
              <PlusCircle className="w-5 h-5" /> Leave a Review
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-background rounded-2xl p-8 border border-white/5 relative"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-primary/10" />
              
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-5 h-5 ${star <= (testimonial.rating || 5) ? 'fill-primary text-primary' : 'text-gray/30'}`} 
                  />
                ))}
              </div>
              
              <p className="text-gray italic leading-relaxed mb-8 relative z-10">
                "{testimonial.comment}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center text-primary font-bold text-xl">
                  {testimonial.customerName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold font-heading">{testimonial.customerName}</h4>
                  {testimonial.role && <p className="text-gray text-sm">{testimonial.role}</p>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
