export const getContactReplyTemplate = (data) => {
  const { name } = data;
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #10b981;">We received your message</h2>
      <p>Dear ${name},</p>
      <p>Thank you for getting in touch with Tirupati Automobiles! We have successfully received your message.</p>
      <p>One of our team members will review your inquiry and get back to you as soon as possible, usually within 24 business hours.</p>
      
      <p style="margin-top: 20px;">We appreciate your patience and look forward to assisting you.</p>
      
      <p>Best regards,<br><strong>Tirupati Automobiles Support Team</strong></p>
    </div>
  `;
};
