import { MessageCircle } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { getWhatsAppUrl, getGeneralMessage } from '../../utils/contactUtils';

const WhatsAppButton = ({ 
  message, 
  text = 'WhatsApp Us', 
  className = '', 
  iconOnly = false 
}) => {
  const { settings } = useSettings();
  
  if (!settings?.whatsapp) return null;

  const finalMessage = message || getGeneralMessage();
  const waUrl = getWhatsAppUrl(settings.whatsapp, finalMessage);

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#128C7E] transition-colors rounded-lg font-medium ${className}`}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className={iconOnly ? "w-6 h-6" : "w-5 h-5"} />
      {!iconOnly && <span>{text}</span>}
    </a>
  );
};

export default WhatsAppButton;
