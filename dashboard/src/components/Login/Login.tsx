import { Col, Row } from "antd";
import React, { FC, useState } from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";
import { GoogleLogin } from "react-google-login";
import { useSignupWithGoogleMutation } from "src/generated/graphql";
import { login as authLogin } from "src/auth";

export const Login: FC = () => {
  const [redirect, setRedirect] = useState<string | null>(null);
  const [signUpWithGoogle] = useSignupWithGoogleMutation();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID!;

  if (redirect) {
    return <Redirect to={redirect} exact />;
  }

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Row>
        <Col>
          <GoogleLogin
            clientId={clientId}
            onSuccess={async (response) => {
              if ("getBasicProfile" in response) {
                const signupResponse = await signUpWithGoogle({
                  variables: { idToken: response.tokenId },
                });

                authLogin({
                  accessToken: signupResponse.data?.signupWithGoogle.accessToken!,
                  refreshToken: signupResponse.data?.signupWithGoogle.refreshToken!,
                });
              }
            }}
          />
        </Col>
      </Row>
      <LoginForm afterLogin={() => requestAnimationFrame(() => setRedirect("/"))} />
    </Row>
  );
};

export default Login;
