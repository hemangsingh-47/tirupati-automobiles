export const getBookingConfirmationTemplate = (data) => {
  const { customerName, bookingId, carBrand, carModel, registrationNumber, serviceType, preferredDate, preferredTime, workshopContactNumber } = data;
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #d97706;">Booking Confirmed</h2>
      <p>Dear ${customerName},</p>
      <p>Your service booking with Tirupati Automobiles has been successfully confirmed. Below are the details of your booking:</p>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Booking ID:</strong> ${bookingId}</p>
        <p><strong>Vehicle:</strong> ${carBrand} ${carModel}</p>
        <p><strong>Registration Number:</strong> ${registrationNumber}</p>
        <p><strong>Service Type:</strong> ${serviceType}</p>
        <p><strong>Date & Time:</strong> ${preferredDate} at ${preferredTime}</p>
      </div>
      
      <p>Our team will be expecting you. If you have any questions or need to reschedule, please contact us at <strong>${workshopContactNumber}</strong>.</p>
      
      <p>Best regards,<br><strong>Tirupati Automobiles</strong></p>
    </div>
  `;
};
