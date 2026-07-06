import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Upload, X, Send } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import SectionHeading from '../components/common/SectionHeading';
import { bookingService } from '../services/booking.service';
import { Link } from 'react-router-dom';
import { useCustomerAuth } from '../context/CustomerAuthContext';

const services = [
  'General Service', 'Engine Repair', 'Suspension', 'Brake Service',
  'Battery', 'Electrical Repair', 'Denting', 'Painting',
  'Body Shop', 'Insurance Claim', 'Wheel Alignment', 'Wheel Balancing',
  'Car Washing', 'Detailing', 'AC Service'
];

const BookService = () => {
  const { customer } = useCustomerAuth();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      customerName: customer?.name || '',
      email: customer?.email || '',
      phoneNumber: customer?.phone || '',
    }
  });
  
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [successData, setSuccessData] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (selectedImages.length + filesArray.length > 5) {
        alert("Maximum 5 images allowed");
        return;
      }
      setSelectedImages((prev) => [...prev, ...filesArray]);
    }
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    
    selectedImages.forEach(image => {
      formData.append('images', image);
    });

    try {
      let responseData;
      if (customer) {
        responseData = await bookingService.createCustomerBooking(formData);
      } else {
        responseData = await bookingService.createBooking(formData);
      }
      
      setSuccessData(responseData);
      reset();
      setSelectedImages([]);
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <PageHero 
        title="Book A Service" 
        description="Schedule your visit to our premium workshop. We'll take care of the rest."
        image="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
      />

      <section className="py-24 bg-background min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimatePresence mode="wait">
            {successData ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-surface p-12 rounded-2xl border border-white/10 text-center shadow-2xl"
              >
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-4xl font-heading font-bold text-white mb-4">Booking Confirmed!</h2>
                <p className="text-xl text-gray mb-8">Thank you, {successData.customerName}. Your booking has been successfully received.</p>
                
                <div className="inline-block bg-background px-8 py-4 rounded-xl border border-white/5 mb-10">
                  <p className="text-sm text-gray mb-1 uppercase tracking-wider font-semibold">Reference ID</p>
                  <p className="text-2xl font-mono text-primary font-bold">{successData._id.slice(-8).toUpperCase()}</p>
                </div>
                
                <p className="text-gray mb-8">Our service advisor will contact you shortly to confirm your appointment time.</p>
                
                <Link to="/" className="inline-block bg-primary text-background font-bold px-8 py-4 rounded-lg hover:bg-yellow-500 transition-colors">
                  Return to Home
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl"
              >
                <SectionHeading subtitle="Appointment" title="Book Your Slot" centered />
                
                {submitError && (
                  <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 font-medium text-center">
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Customer Details */}
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white mb-6 border-b border-white/10 pb-2">Customer Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray mb-2">Full Name *</label>
                        <input 
                          {...register("customerName", { required: "Name is required" })}
                          readOnly={!!customer}
                          className={`w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none ${customer ? 'opacity-70 cursor-not-allowed' : ''}`}
                        />
                        {errors.customerName && <p className="text-red-400 text-sm mt-1">{errors.customerName.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray mb-2">Phone Number *</label>
                        <input 
                          type="tel"
                          {...register("phoneNumber", { required: "Phone is required" })}
                          readOnly={!!customer}
                          className={`w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none ${customer ? 'opacity-70 cursor-not-allowed' : ''}`}
                        />
                        {errors.phoneNumber && <p className="text-red-400 text-sm mt-1">{errors.phoneNumber.message}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray mb-2">Email Address *</label>
                        <input 
                          type="email"
                          {...register("email", { required: "Email is required" })}
                          readOnly={!!customer}
                          className={`w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none ${customer ? 'opacity-70 cursor-not-allowed' : ''}`}
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white mb-6 border-b border-white/10 pb-2">Vehicle Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray mb-2">Car Brand *</label>
                        <input 
                          {...register("carBrand", { required: "Brand is required" })}
                          placeholder="e.g. Hyundai"
                          className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        />
                        {errors.carBrand && <p className="text-red-400 text-sm mt-1">{errors.carBrand.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray mb-2">Car Model *</label>
                        <input 
                          {...register("carModel", { required: "Model is required" })}
                          placeholder="e.g. Creta"
                          className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        />
                        {errors.carModel && <p className="text-red-400 text-sm mt-1">{errors.carModel.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray mb-2">Manufacturing Year *</label>
                        <input 
                          {...register("manufacturingYear", { required: "Year is required" })}
                          placeholder="e.g. 2021"
                          className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        />
                        {errors.manufacturingYear && <p className="text-red-400 text-sm mt-1">{errors.manufacturingYear.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray mb-2">Fuel Type *</label>
                        <select 
                          {...register("fuelType", { required: "Fuel Type is required" })}
                          className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        >
                          <option value="">Select Fuel</option>
                          <option value="Petrol">Petrol</option>
                          <option value="Diesel">Diesel</option>
                          <option value="CNG">CNG</option>
                          <option value="EV">EV</option>
                        </select>
                        {errors.fuelType && <p className="text-red-400 text-sm mt-1">{errors.fuelType.message}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray mb-2">Registration Number *</label>
                        <input 
                          {...register("registrationNumber", { required: "Registration is required" })}
                          placeholder="e.g. RJ 24 CA 1234"
                          className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none uppercase"
                        />
                        {errors.registrationNumber && <p className="text-red-400 text-sm mt-1">{errors.registrationNumber.message}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white mb-6 border-b border-white/10 pb-2">Service Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray mb-2">Select Service *</label>
                        <select 
                          {...register("serviceType", { required: "Service type is required" })}
                          className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        >
                          <option value="">Choose a service...</option>
                          {services.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.serviceType && <p className="text-red-400 text-sm mt-1">{errors.serviceType.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray mb-2">Preferred Date *</label>
                        <input 
                          type="date"
                          {...register("preferredDate", { required: "Date is required" })}
                          className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none [color-scheme:dark]"
                        />
                        {errors.preferredDate && <p className="text-red-400 text-sm mt-1">{errors.preferredDate.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray mb-2">Preferred Time *</label>
                        <input 
                          type="time"
                          {...register("preferredTime", { required: "Time is required" })}
                          className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none [color-scheme:dark]"
                        />
                        {errors.preferredTime && <p className="text-red-400 text-sm mt-1">{errors.preferredTime.message}</p>}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray mb-2">Problem Description (Optional)</label>
                        <textarea 
                          {...register("problemDescription")}
                          rows="4"
                          className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                          placeholder="Describe any specific issues you are facing..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white mb-6 border-b border-white/10 pb-2">Upload Images (Optional)</h3>
                    <p className="text-gray text-sm mb-4">Upload up to 5 images of the damage or dashboard warning lights.</p>
                    
                    <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-primary/50 transition-colors bg-background">
                      <input 
                        type="file" 
                        id="images" 
                        multiple 
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      <label htmlFor="images" className="cursor-pointer flex flex-col items-center">
                        <Upload className="w-10 h-10 text-primary mb-3" />
                        <span className="text-white font-medium mb-1">Click to upload images</span>
                        <span className="text-gray text-sm">PNG, JPG or WEBP (Max 5MB each)</span>
                      </label>
                    </div>

                    {selectedImages.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-4">
                        {selectedImages.map((file, index) => (
                          <div key={index} className="relative group w-24 h-24 rounded-lg overflow-hidden border border-white/10">
                            <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button type="button" onClick={() => removeImage(index)} className="p-1 bg-red-500 rounded-full text-white hover:bg-red-600">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-6">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-background font-bold text-lg px-8 py-4 rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing Booking...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Confirm Booking
                          <Send className="w-5 h-5 ml-2" />
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>
    </main>
  );
};

export default BookService;
