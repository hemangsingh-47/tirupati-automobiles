/**
 * Cleans a phone number for use in URLs by removing non-digit characters (except leading +).
 */
const cleanPhoneNumber = (number) => {
  if (!number) return '';
  const hasPlus = number.startsWith('+');
  const digitsOnly = number.replace(/\D/g, '');
  return hasPlus ? `+${digitsOnly}` : digitsOnly;
};

/**
 * Generates an official WhatsApp wa.me URL
 */
export const getWhatsAppUrl = (number, message = '') => {
  if (!number) return '#';
  const cleanNumber = cleanPhoneNumber(number);
  const baseUrl = `https://wa.me/${cleanNumber.replace('+', '')}`;
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
};

/**
 * Generates a standard tel: URL
 */
export const getCallUrl = (number) => {
  if (!number) return '#';
  const cleanNumber = cleanPhoneNumber(number);
  return `tel:${cleanNumber}`;
};

/**
 * Generates the pre-filled message for a general inquiry
 */
export const getGeneralMessage = () => {
  return "Hello Tirupati Automobiles,\n\nI would like to enquire about your services.";
};

/**
 * Generates the pre-filled message for a booking confirmation
 */
export const getBookingMessage = (booking) => {
  if (!booking) return getGeneralMessage();
  
  return `Hello Tirupati Automobiles,

I have successfully submitted my booking.

Booking ID:
${booking._id?.slice(-8).toUpperCase()}

Vehicle:
${booking.carBrand} ${booking.carModel}

Registration Number:
${booking.registrationNumber}

Preferred Date:
${new Date(booking.preferredDate).toLocaleDateString()}

Please confirm my booking.

Thank you.`;
};
