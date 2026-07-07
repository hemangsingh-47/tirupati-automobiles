import { createContext, useState, useEffect, useContext } from 'react';
import { customerService } from '../services/customer.service';

const CustomerAuthContext = createContext();

export const CustomerAuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      const customerInfo = localStorage.getItem('customerInfo');
      if (customerInfo) {
        const parsedCustomer = JSON.parse(customerInfo);
        setCustomer(parsedCustomer);
      }
      setLoading(false);
    };
    fetchCustomer();
  }, []);

  const login = async (email, password) => {
    const data = await customerService.login(email, password);
    setCustomer(data);
    localStorage.setItem('customerInfo', JSON.stringify(data));
    return data;
  };

  const register = async (customerData) => {
    const data = await customerService.register(customerData);
    setCustomer(data);
    localStorage.setItem('customerInfo', JSON.stringify(data));
    return data;
  };

  const updateProfile = async (customerData) => {
    const data = await customerService.updateProfile(customerData);
    setCustomer(data);
    localStorage.setItem('customerInfo', JSON.stringify(data));
    return data;
  };

  const logout = () => {
    setCustomer(null);
    localStorage.removeItem('customerInfo');
  };

  return (
    <CustomerAuthContext.Provider value={{ customer, loading, login, register, updateProfile, logout }}>
      {children}
    </CustomerAuthContext.Provider>
  );
};

export const useCustomerAuth = () => {
  return useContext(CustomerAuthContext);
};
