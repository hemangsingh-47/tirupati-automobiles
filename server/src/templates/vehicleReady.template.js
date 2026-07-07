export const getVehicleReadyTemplate = (data) => {
  const { customerName, carBrand, carModel, registrationNumber, workshopContactNumber } = data;
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #22c55e;">Your Vehicle is Ready!</h2>
      <p>Dear ${customerName},</p>
      <p>Great news! Your vehicle (<strong>${carBrand} ${carModel} - ${registrationNumber}</strong>) is now ready for pickup at Tirupati Automobiles.</p>
      
      <p>All requested services have been completed successfully. Please drop by our workshop at your earliest convenience to collect your vehicle.</p>
      
      <p>If you have any questions before arriving, feel free to call us at <strong>${workshopContactNumber}</strong>.</p>
      
      <p>Thank you for choosing Tirupati Automobiles!</p>
      
      <p>Best regards,<br><strong>Tirupati Automobiles</strong></p>
    </div>
  `;
};
