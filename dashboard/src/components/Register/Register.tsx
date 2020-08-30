import { EyeInvisibleOutlined, EyeTwoTone, RollbackOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Button, Col, Input, Layout, Row, Space } from 'antd';
import { loader } from 'graphql.macro';
import React from 'react';
import {
  GoogleLogin,
  GoogleLoginResponse
} from 'react-google-login';
import { Link, Redirect } from 'react-router-dom';
import { RegisterMutation } from 'src/generated/graphql';


const RegisterQuery = loader('src/queries/register.graphql');
export const Register: React.FC = () => {
  const [register] = useMutation<RegisterMutation>(RegisterQuery);
  const [profile, setProfile] = React.useState<GoogleLoginResponse>();
  const [password, setPassword] = React.useState('');
  const [done, setDone] = React.useState(false);

  function finishRegister(response: GoogleLoginResponse) {
    const profile = response.getBasicProfile();
    register({
      variables: {
        email: profile.getEmail(),
        firstName: profile.getFamilyName(),
        lastName: profile.getGivenName(),
        password
      }
    });
  }

  if (done) {
    return <Redirect to={'/login'} exact />
  }

  return (
    <Layout>
      <Layout.Content>
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
          {profile ? (
            <Space direction="vertical">
              <Input.Password
                onChange={e => setPassword(e.target.value)}
                value={password}
                placeholder="input password"
                suffix={(visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
              <Button onClick={() => finishRegister(profile)}>Finish registration</Button>
            </Space>
          ) : (
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
                    onSuccess={(response) => {
                      if ('getBasicProfile' in response) {
                        setProfile(response);
                      }
                    }}
                  />
                </Col>
              </Row>
            )}

        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default Register;
