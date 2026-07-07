import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { getWhatsAppUrl, getCallUrl } from '../utils/contactUtils';

const Footer = () => {
  const { settings } = useSettings();

  const businessName = settings?.businessName || 'Tirupati Automobiles';
  const nameParts = businessName.split(' ');
  const firstName = nameParts[0];
  const secondName = nameParts.slice(1).join(' ');

  return (
    <footer className="bg-surface pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-heading font-bold text-primary">{firstName}</span>
              <span className="text-2xl font-heading font-bold text-white">{secondName}</span>
            </Link>
            <p className="text-gray mb-6 leading-relaxed">
              {settings?.tagline || 'Premium multi-brand car service center. We provide expert repairs, genuine spare parts, and hassle-free insurance claims.'}
            </p>
            <div className="flex space-x-4">
              {settings?.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-gray hover:text-primary hover:bg-white/5 transition-all font-semibold text-sm">
                  FB
                </a>
              )}
              {settings?.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-gray hover:text-primary hover:bg-white/5 transition-all font-semibold text-sm">
                  IG
                </a>
              )}
              {settings?.whatsapp && (
                <a href={getWhatsAppUrl(settings.whatsapp)} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-gray hover:text-primary hover:bg-white/5 transition-all font-semibold text-sm">
                  WA
                </a>
              )}
              {settings?.youtube && (
                <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-gray hover:text-primary hover:bg-white/5 transition-all font-semibold text-sm">
                  YT
                </a>
              )}
              {settings?.linkedin && (
                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-gray hover:text-primary hover:bg-white/5 transition-all font-semibold text-sm">
                  IN
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Gallery', 'Insurance Claim', 'Contact Us'].map((item, index) => (
                <li key={index}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-') === 'home' ? '' : item.toLowerCase().replace(' ', '-')}`} className="text-gray hover:text-primary transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-white mb-6">Our Services</h3>
            <ul className="space-y-4">
              {['General Car Service', 'Denting & Painting', 'Accident Repair', 'Electrical Work', 'Battery Services'].map((item, index) => (
                <li key={index}>
                  <Link to="/services" className="text-gray hover:text-primary transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-white mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span className="text-gray whitespace-pre-line">{settings?.address}</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href={getCallUrl(settings?.phone)} className="text-gray hover:text-primary transition-colors">{settings?.phone}</a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href={`mailto:${settings?.email}`} className="text-gray hover:text-primary transition-colors">{settings?.email}</a>
              </li>
              <li className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span className="text-gray">
                  Mon - Sat: {settings?.hoursWeekdays}<br/>
                  Sunday: {settings?.hoursWeekend}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray">
            &copy; {new Date().getFullYear()} {businessName}. All rights reserved.
          </p>
          <div className="text-sm text-gray">
            Designed with <span className="text-primary">&hearts;</span> for premium auto care.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
