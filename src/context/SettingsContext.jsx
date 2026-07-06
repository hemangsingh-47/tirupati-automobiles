import { createContext, useState, useEffect, useContext } from 'react';
import { settingsService } from '../services/settings.service';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSettings = async () => {
    try {
      const data = await settingsService.getSettings();
      setSettings(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch settings', err);
      setError('Failed to load settings. Using defaults.');
      // Provide fallback defaults if backend is unreachable
      setSettings({
        businessName: 'Tirupati Automobiles',
        tagline: 'Professional Car Care & Multi Brand Workshop',
        phone: '+91 94132 87401',
        email: 'info@tirupatiautomobiles.com',
        address: 'Plot No. 12, RIICO Industrial Area, Sirohi, Rajasthan - 307001',
        hoursWeekdays: '9:00 AM - 7:00 PM',
        hoursWeekend: '9:00 AM - 2:00 PM (Sunday Closed)',
        facebook: '',
        instagram: '',
        whatsapp: '',
        googleMapsLink: ''
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, error, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  return useContext(SettingsContext);
};
