import { Navigate, Outlet } from 'react-router-dom';
import { useCustomerAuth } from '../../context/CustomerAuthContext';

const CustomerProtectedRoute = ({ children }) => {
  const { customer, loading } = useCustomerAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!customer) {
    return <Navigate to="/customer/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default CustomerProtectedRoute;
