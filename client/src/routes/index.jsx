import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import CustomerLayout from '../layouts/CustomerLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';
import CustomerProtectedRoute from '../components/common/CustomerProtectedRoute';

// Standard loading fallback
const PageLoader = () => (
  <div className="flex justify-center items-center h-full min-h-[50vh]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Lazy Load Public Pages
import Home from '../pages/Home';
const About = lazy(() => import('../pages/About'));
const Services = lazy(() => import('../pages/Services'));
const Gallery = lazy(() => import('../pages/Gallery'));
const MediaCenter = lazy(() => import('../pages/MediaCenter'));
const InsuranceClaim = lazy(() => import('../pages/InsuranceClaim'));
const Contact = lazy(() => import('../pages/Contact'));
const Faq = lazy(() => import('../pages/Faq'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const Terms = lazy(() => import('../pages/Terms'));
const NotFound = lazy(() => import('../pages/NotFound'));
const BookService = lazy(() => import('../pages/BookService'));
const SubmitReview = lazy(() => import('../pages/SubmitReview'));

// Lazy Load Customer Portal Pages
const CustomerLogin = lazy(() => import('../pages/customer/CustomerLogin'));
const CustomerRegister = lazy(() => import('../pages/customer/CustomerRegister'));
const CustomerDashboard = lazy(() => import('../pages/customer/CustomerDashboard'));
const CustomerProfile = lazy(() => import('../pages/customer/CustomerProfile'));
const CustomerBookings = lazy(() => import('../pages/customer/CustomerBookings'));
const CustomerBookingDetails = lazy(() => import('../pages/customer/CustomerBookingDetails'));
const CustomerServiceHistory = lazy(() => import('../pages/customer/CustomerServiceHistory'));
const CustomerNotifications = lazy(() => import('../pages/customer/CustomerNotifications'));
const MyVehicles = lazy(() => import('../pages/customer/MyVehicles'));
const VehicleProfile = lazy(() => import('../pages/customer/VehicleProfile'));
const InsuranceRenewal = lazy(() => import('../pages/customer/InsuranceRenewal'));

// Lazy Load Dashboard Pages
const Login = lazy(() => import('../pages/dashboard/Login'));
const AdminDashboard = lazy(() => import('../pages/dashboard/AdminDashboard'));
const StaffDashboard = lazy(() => import('../pages/dashboard/StaffDashboard'));
const BookingsList = lazy(() => import('../pages/dashboard/BookingsList'));
const BookingDetails = lazy(() => import('../pages/dashboard/BookingDetails'));
const InsuranceManagement = lazy(() => import('../pages/dashboard/InsuranceManagement'));
const UsersList = lazy(() => import('../pages/dashboard/UsersList'));
const CustomersList = lazy(() => import('../pages/dashboard/CustomersList'));
const CustomerDetails = lazy(() => import('../pages/dashboard/CustomerDetails'));
const GalleryManager = lazy(() => import('../pages/dashboard/GalleryManager'));
const ReviewsManager = lazy(() => import('../pages/dashboard/ReviewsManager'));
const Analytics = lazy(() => import('../pages/dashboard/Analytics'));
const Settings = lazy(() => import('../pages/dashboard/Settings'));

// CMS
const WebsiteContentManager = lazy(() => import('../pages/dashboard/cms/WebsiteContentManager'));
const ServicesManager = lazy(() => import('../pages/dashboard/cms/ServicesManager'));
const TeamManager = lazy(() => import('../pages/dashboard/cms/TeamManager'));
const FaqManager = lazy(() => import('../pages/dashboard/cms/FaqManager'));
const SeoManager = lazy(() => import('../pages/dashboard/cms/SeoManager'));
const MediaManager = lazy(() => import('../pages/dashboard/cms/MediaManager'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: (
      <Suspense fallback={<PageLoader />}>
        <NotFound />
      </Suspense>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <Suspense fallback={<PageLoader />}><About /></Suspense> },
      { path: 'services', element: <Suspense fallback={<PageLoader />}><Services /></Suspense> },
      { path: 'gallery', element: <Suspense fallback={<PageLoader />}><Gallery /></Suspense> },
      { path: 'media', element: <Suspense fallback={<PageLoader />}><MediaCenter /></Suspense> },
      { path: 'insurance', element: <Suspense fallback={<PageLoader />}><InsuranceClaim /></Suspense> },
      { path: 'contact', element: <Suspense fallback={<PageLoader />}><Contact /></Suspense> },
      { path: 'book', element: <Suspense fallback={<PageLoader />}><BookService /></Suspense> },
      { path: 'submit-review', element: <Suspense fallback={<PageLoader />}><SubmitReview /></Suspense> },
      { path: 'faq', element: <Suspense fallback={<PageLoader />}><Faq /></Suspense> },
      { path: 'privacy-policy', element: <Suspense fallback={<PageLoader />}><PrivacyPolicy /></Suspense> },
      { path: 'terms', element: <Suspense fallback={<PageLoader />}><Terms /></Suspense> },
    ],
  },
  {
    path: '/customer/login',
    element: <Suspense fallback={<PageLoader />}><CustomerLogin /></Suspense>
  },
  {
    path: '/customer/register',
    element: <Suspense fallback={<PageLoader />}><CustomerRegister /></Suspense>
  },
  {
    path: '/customer',
    element: (
      <CustomerProtectedRoute>
        <CustomerLayout />
      </CustomerProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <Suspense fallback={<PageLoader />}><CustomerDashboard /></Suspense> },
      { path: 'profile', element: <Suspense fallback={<PageLoader />}><CustomerProfile /></Suspense> },
      { path: 'bookings', element: <Suspense fallback={<PageLoader />}><CustomerBookings /></Suspense> },
      { path: 'booking/:id', element: <Suspense fallback={<PageLoader />}><CustomerBookingDetails /></Suspense> },
      { path: 'service-history', element: <Suspense fallback={<PageLoader />}><CustomerServiceHistory /></Suspense> },
      { path: 'notifications', element: <Suspense fallback={<PageLoader />}><CustomerNotifications /></Suspense> },
      { path: 'vehicles', element: <Suspense fallback={<PageLoader />}><MyVehicles /></Suspense> },
      { path: 'vehicle/:id', element: <Suspense fallback={<PageLoader />}><VehicleProfile /></Suspense> },
      { path: 'insurance/renew', element: <Suspense fallback={<PageLoader />}><InsuranceRenewal /></Suspense> },
    ]
  },
  {
    path: '/admin/login',
    element: <Suspense fallback={<PageLoader />}><Login /></Suspense>
  },
  {
    path: '/staff/login',
    element: <Suspense fallback={<PageLoader />}><Login /></Suspense>
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense> },
      { path: 'bookings', element: <Suspense fallback={<PageLoader />}><BookingsList /></Suspense> },
      { path: 'bookings/:id', element: <Suspense fallback={<PageLoader />}><BookingDetails /></Suspense> },
      { path: 'insurance', element: <Suspense fallback={<PageLoader />}><InsuranceManagement /></Suspense> },
      { path: 'customers', element: <Suspense fallback={<PageLoader />}><CustomersList /></Suspense> },
      { path: 'customers/:phone', element: <Suspense fallback={<PageLoader />}><CustomerDetails /></Suspense> },
      { path: 'gallery', element: <Suspense fallback={<PageLoader />}><GalleryManager /></Suspense> },
      { path: 'reviews', element: <Suspense fallback={<PageLoader />}><ReviewsManager /></Suspense> },
      { path: 'users', element: <Suspense fallback={<PageLoader />}><UsersList /></Suspense> },
      { path: 'analytics', element: <Suspense fallback={<PageLoader />}><Analytics /></Suspense> },
      { path: 'settings', element: <Suspense fallback={<PageLoader />}><Settings /></Suspense> },
      { path: 'cms/content', element: <Suspense fallback={<PageLoader />}><WebsiteContentManager /></Suspense> },
      { path: 'cms/services', element: <Suspense fallback={<PageLoader />}><ServicesManager /></Suspense> },
      { path: 'cms/team', element: <Suspense fallback={<PageLoader />}><TeamManager /></Suspense> },
      { path: 'cms/media', element: <Suspense fallback={<PageLoader />}><MediaManager /></Suspense> },
      { path: 'cms/faq', element: <Suspense fallback={<PageLoader />}><FaqManager /></Suspense> },
      { path: 'cms/seo', element: <Suspense fallback={<PageLoader />}><SeoManager /></Suspense> },
    ]
  },
  {
    path: '/staff',
    element: (
      <ProtectedRoute allowedRoles={['staff']}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <Suspense fallback={<PageLoader />}><StaffDashboard /></Suspense> },
      { path: 'bookings', element: <Suspense fallback={<PageLoader />}><BookingsList /></Suspense> },
      { path: 'bookings/:id', element: <Suspense fallback={<PageLoader />}><BookingDetails /></Suspense> },
    ]
  },
  {
    path: '*',
    element: <Suspense fallback={<PageLoader />}><NotFound /></Suspense>
  }
]);
