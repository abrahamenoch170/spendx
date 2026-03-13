import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const IntroRedirector = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const seen = localStorage.getItem('spendx_intro_seen');
    if (seen === 'true') {
      navigate('/app/home', { replace: true });
    } else {
      navigate('/app/intro', { replace: true });
    }
  }, [navigate]);

  return null;
};
