import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from 'src/auth';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

const Routes: FC = () => {
  const [logged] = useAuth();
  return <Router>{logged ? <PrivateRoutes /> : <PublicRoutes />}</Router>;
};

export default Routes;
