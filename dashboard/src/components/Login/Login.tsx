import React, { FC, useState } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import { Row, Col, Typography } from 'antd';

export const Login: FC = () => {
  const [redirect, setRedirect] = useState<string | null>(null);

  if (redirect) {
    return <Redirect to={redirect} exact />;
  }

  return (
    <Row style={{ minHeight: '100vh' }}>
      <Col span={13} style={{ background: '#2ECC71' }}>
        <Row justify="center" align="middle">
          <Typography.Title>MyMoney</Typography.Title>
        </Row>
      </Col>
      <Col span={11}>
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
          <Col>
            <LoginForm afterLogin={() => setRedirect('/')} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Login;
