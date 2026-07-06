import mongoose from 'mongoose';

const websiteContentSchema = new mongoose.Schema(
  {
    // Hero Section
    heroTitle: { type: String, default: 'Complete Car Care Solutions' },
    heroSubtitle: { type: String, default: 'Trusted Multi Brand Car Workshop In Sirohi' },
    heroDescription: { 
      type: String, 
      default: 'Professional car care & insurance claim experts. From general maintenance to complex accident repairs, we use genuine parts and skilled technicians to deliver excellence in every journey.' 
    },
    heroCtaPrimaryText: { type: String, default: 'Book Service' },
    heroCtaSecondaryText: { type: String, default: 'Call Now' },
    
    // About Section
    aboutTitle: { type: String, default: 'A Legacy of Excellence in Automobile Care' },
    aboutDescription: { 
      type: String, 
      default: 'Established in the heart of Sirohi, Tirupati Automobiles has grown from a humble repair shop into a state-of-the-art multi-brand workshop. We built our reputation on a foundation of trust, transparency, and technical superiority.' 
    },
    
    // Statistics Section
    stat1Label: { type: String, default: 'Happy Customers' },
    stat1Value: { type: String, default: '5000+' },
    stat2Label: { type: String, default: 'Vehicles Repaired' },
    stat2Value: { type: String, default: '15000+' },
    stat3Label: { type: String, default: 'Years Experience' },
    stat3Value: { type: String, default: '10+' },
    stat4Label: { type: String, default: 'Expert Mechanics' },
    stat4Value: { type: String, default: '15+' },
    
    // Section Visibility Toggles (Homepage)
    showHero: { type: Boolean, default: true },
    showServices: { type: Boolean, default: true },
    showGallery: { type: Boolean, default: true },
    showTestimonials: { type: Boolean, default: true },
    showStats: { type: Boolean, default: true },
    showBrands: { type: Boolean, default: true },
    showFaq: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const WebsiteContent = mongoose.model('WebsiteContent', websiteContentSchema);
export default WebsiteContent;
