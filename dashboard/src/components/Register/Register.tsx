import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  RollbackOutlined
} from '@ant-design/icons';
import { Button, Col, Input, Layout, Row, Space } from 'antd';
import React, { FC, useState } from 'react';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import { Link, Redirect } from 'react-router-dom';
import { useRegisterMutation } from 'src/generated/graphql';

enum RegistrationStep {
  connect,
  setPassword,
  done,
}

export const Register: FC = () => {
  const [registerMutation] = useRegisterMutation();
  const [profile, setProfile] = useState<GoogleLoginResponse>();
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(RegistrationStep.connect);

  function finishRegister(response: GoogleLoginResponse) {
    const profile = response.getBasicProfile();
    registerMutation({
      variables: {
        email: profile.getEmail(),
        firstName: profile.getFamilyName(),
        lastName: profile.getGivenName(),
        imageUrl: profile.getImageUrl(),
        additional: {
          google: {
            id: response.getId(),
            accessToken: response.accessToken
          }
        },
        password,
      },
    });
    setStep(RegistrationStep.done);
  }

  if (step === RegistrationStep.done) {
    return <Redirect to={'/login'} exact />;
  }

  return (
    <Layout>
      <Layout.Content>
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
          {step === RegistrationStep.setPassword && profile ? (
            <Space direction="vertical">
              <Input.Password
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="input password"
                suffix={(visible: boolean) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              <Button onClick={() => finishRegister(profile)}>
                Finish registration
              </Button>
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
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
                    onSuccess={(response) => {
                      if ('getBasicProfile' in response) {
                        setProfile(response);
                        setStep(RegistrationStep.setPassword);
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
