import { Phone } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { getCallUrl } from '../../utils/contactUtils';

const CallButton = ({ 
  useEmergency = false, 
  text = 'Call Now', 
  className = '', 
  iconOnly = false 
}) => {
  const { settings } = useSettings();
  
  const targetNumber = useEmergency ? settings?.emergencyNumber : settings?.phone;
  
  if (!targetNumber) {
    return (
      <button 
        disabled 
        className={`inline-flex items-center justify-center gap-2 bg-gray/50 text-white/50 cursor-not-allowed rounded-lg font-medium ${className}`}
        aria-label="Phone number not available"
      >
        <Phone className={iconOnly ? "w-6 h-6" : "w-5 h-5"} />
        {!iconOnly && <span>Unavailable</span>}
      </button>
    );
  }

  const callUrl = getCallUrl(targetNumber);

  return (
    <a
      href={callUrl}
      className={`inline-flex items-center justify-center gap-2 bg-primary text-background hover:bg-yellow-500 transition-colors rounded-lg font-bold ${className}`}
      aria-label={`Call ${targetNumber}`}
    >
      <Phone className={iconOnly ? "w-6 h-6" : "w-5 h-5"} />
      {!iconOnly && <span>{useEmergency ? 'Emergency Call' : text}</span>}
    </a>
  );
};

export default CallButton;
