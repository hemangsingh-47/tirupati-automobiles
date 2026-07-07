import { Resend } from 'resend';
import dotenv from 'dotenv';
import { getBookingConfirmationTemplate } from '../templates/bookingConfirmation.template.js';
import { getAdminBookingTemplate } from '../templates/adminBooking.template.js';
import { getContactReplyTemplate } from '../templates/contactReply.template.js';
import { getVehicleReadyTemplate } from '../templates/vehicleReady.template.js';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev';

const sendEmail = async ({ to, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: `Tirupati Automobiles <${fromEmail}>`,
      to,
      subject,
      html,
    });

    if (error) {
      console.error('Email Failed:', error);
      return { success: false, error };
    }

    console.log(`Email Sent [${subject}] to ${to}`);
    return { success: true, data };
  } catch (error) {
    console.error('Email Exception:', error);
    return { success: false, error };
  }
};

export const sendBookingConfirmation = async (customerEmail, data) => {
  const html = getBookingConfirmationTemplate(data);
  const result = await sendEmail({
    to: customerEmail,
    subject: 'Booking Confirmed | Tirupati Automobiles',
    html,
  });
  if (result.success) {
    console.log('Booking Confirmation Sent');
  }
  return result;
};

export const sendAdminNotification = async (adminEmail, data) => {
  const html = getAdminBookingTemplate(data);
  const result = await sendEmail({
    to: adminEmail,
    subject: 'New Booking Received',
    html,
  });
  if (result.success) {
    console.log('Admin Notification Sent');
  }
  return result;
};

export const sendInsuranceReminder = async (to, data) => {
  const subject = data.type === 'EXPIRED' 
    ? 'URGENT: Your Vehicle Insurance Has Expired' 
    : `Reminder: Vehicle Insurance Expires in ${data.daysLeft} Days`;
    
  const html = `
    <div style="font-family: sans-serif; max-w-xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 style="color: #333;">Hello ${data.name},</h2>
      <p>This is a reminder regarding your vehicle <strong>${data.registrationNumber}</strong>.</p>
      ${data.type === 'EXPIRED' 
        ? `<p style="color: red; font-weight: bold;">Your insurance policy (${data.policyNumber}) has EXPIRED on ${new Date(data.expiryDate).toLocaleDateString()}.</p>`
        : `<p>Your insurance policy (${data.policyNumber}) is set to expire in <strong>${data.daysLeft} days</strong> (on ${new Date(data.expiryDate).toLocaleDateString()}).</p>`
      }
      <p>Please contact us to renew your insurance and maintain your vehicle's coverage.</p>
      <p>Best Regards,<br/>Tirupati Automobiles</p>
    </div>
  `;

  return sendEmail({
    to,
    subject,
    html
  });
};

export const sendContactThankYou = async (customerEmail, data) => {
  const html = getContactReplyTemplate(data);
  return await sendEmail({
    to: customerEmail,
    subject: 'We received your message',
    html,
  });
};

export const sendVehicleReadyNotification = async (customerEmail, data) => {
  const html = getVehicleReadyTemplate(data);
  return await sendEmail({
    to: customerEmail,
    subject: 'Your Vehicle is Ready for Delivery',
    html,
  });
};
