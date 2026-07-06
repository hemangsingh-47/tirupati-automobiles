import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    businessName: { type: String, default: 'Tirupati Automobiles' },
    tagline: { type: String, default: 'Professional Car Care & Multi Brand Workshop' },
    phone: { type: String, default: '+91 94132 87401' },
    email: { type: String, default: 'info@tirupatiautomobiles.com' },
    address: { type: String, default: 'Plot No. 12, RIICO Industrial Area, Sirohi, Rajasthan - 307001' },
    hoursWeekdays: { type: String, default: '9:00 AM - 7:00 PM' },
    hoursWeekend: { type: String, default: '9:00 AM - 2:00 PM (Sunday Closed)' },
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    googleMapsLink: { type: String, default: '' },
    emergencyNumber: { type: String, default: '' },
    
    // SEO Settings
    metaTitle: { type: String, default: 'Tirupati Automobiles - Professional Car Care' },
    metaDescription: { type: String, default: 'Expert car repair, maintenance, and insurance claims in Sirohi.' },
    keywords: { type: String, default: 'car repair, mechanic, body shop, sirohi, insurance claim' },
    ogImage: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
