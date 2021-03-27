import { Spin } from 'antd';
import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from 'src/auth';
import Layout from './Layout';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

const Routes: FC = () => {
  const { logged, loading } = useAuth();

  if (loading) {
    return (
      <Router>
        <Layout>
          <Spin spinning />
        </Layout>
      </Router>
    );
  }

  return <Router>{logged ? <PrivateRoutes /> : <PublicRoutes />}</Router>;
};

export default Routes;
