
import React from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthHOC: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');

    React.useEffect(() => {
      if (!token) {
        navigate('/login'); 
      }
    }, [token, navigate]);

    return token ? <WrappedComponent /> : null; 
  };

  return AuthHOC;
};

export default withAuth;
