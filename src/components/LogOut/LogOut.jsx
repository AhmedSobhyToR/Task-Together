import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogOut = ({ token }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div>
      Logging out...
    </div>
  );
};

export default LogOut;
