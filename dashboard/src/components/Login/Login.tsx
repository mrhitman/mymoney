import { Row } from 'antd';
import React, { FC, useState } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';

export const Login: FC = () => {
  const [redirect, setRedirect] = useState<string | null>(null);

  if (redirect) {
    return <Redirect to={redirect} exact />;
  }

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <LoginForm afterLogin={() => setRedirect('/')} />
    </Row>
  );
};

export default Login;
