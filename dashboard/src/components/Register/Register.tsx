import React from 'react';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { Row, Col, Layout, Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import {
  BackwardFilled,
  StepBackwardFilled,
  RollbackOutlined,
} from '@ant-design/icons';

function onSignIn(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
  if ('getBasicProfile' in response) {
    const profile = response.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    const id_token = response.getAuthResponse().id_token;
    console.log('ID Token: ' + id_token);
  }
}

export const Register: React.FC = () => {
  return (
    <Layout>
      <Layout.Content>
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
          <Row align="middle">
            <Col span={24}>
              <Link to="/login">
                <Button
                  icon={<RollbackOutlined />}
                  size="large"
                  style={{ width: 180.46, height: 46 }}
                >
                  back
                </Button>
              </Link>
            </Col>
            <Col>
              <GoogleLogin
                clientId="172140808548-71g0juh12o6o8jltjkp9pnmq76lkht9v"
                onSuccess={onSignIn}
              />
            </Col>
          </Row>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default Register;
