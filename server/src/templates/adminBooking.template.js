export const getAdminBookingTemplate = (data) => {
  const { customerName, phone, carBrand, carModel, registrationNumber, serviceType, problemDescription, bookingId, preferredDate, preferredTime } = data;
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #1d4ed8;">New Booking Received</h2>
      <p>A new booking request has been submitted. Please review the details below:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Booking ID:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${bookingId}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Customer Name:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${customerName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Vehicle:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${carBrand} ${carModel}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Registration No:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${registrationNumber}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Service Type:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${serviceType}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Problem Description:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${problemDescription || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Preferred Date & Time:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${preferredDate} at ${preferredTime}</td>
        </tr>
      </table>
      
      <p style="margin-top: 20px;">Please check the admin dashboard for further actions.</p>
    </div>
  `;
};
