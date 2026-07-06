# Tirupati Automobiles - CMS & Booking Platform

A full-stack MERN application for a multi-brand car workshop, featuring a public-facing website with dynamic content, a customer portal for booking and tracking services, and a comprehensive admin dashboard.

## Features

### Public Website
- Dynamic Hero, About, and Service sections
- SEO Optimized with React Helmet Async
- Contact and Booking forms
- Reviews showcase

### Customer Portal
- JWT Authentication (Login/Register)
- Book a new service
- Track service status and history
- Real-time notifications on status changes
- Profile management

### Admin Dashboard (CMS)
- **Website Content Management**: Update text, taglines, and FAQs dynamically
- **Service Management**: Add/Edit/Delete services
- **Booking Management**: Accept, update status, and manage appointments
- **User & Customer Management**: Manage staff, admins, and registered customers
- **Gallery & Reviews**: Curate portfolio images and customer feedback
- **System Settings**: Global configurations and contact details

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Framer Motion, Axios, React Hook Form, React Helmet Async
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Multer
**Security:** Helmet, Express-Rate-Limit, Express-Mongo-Sanitize, XSS-Clean
**Performance:** Compression, PM2 (Production)

## Getting Started

1. Clone the repository
2. Install dependencies:
   - Root: `npm install`
   - Server: `cd server && npm install`
3. Create `.env` files in both root and `/server`
4. Run Development: `npm run dev` in both directories

## Production Deployment
See `deployment.md` for detailed instructions on deploying to production environments.
