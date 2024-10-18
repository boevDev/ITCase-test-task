import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate('/product-list');
  }, [navigate]);

  return null;
};
