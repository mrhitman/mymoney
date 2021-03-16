import React, { FC, useState } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';

export const Login: FC = () => {
  const [redirect, setRedirect] = useState<string | null>(null);

  if (redirect) {
    return <Redirect to={redirect} exact />;
  }

  return (
    <div className="App">
      <div className="login">
        <LoginForm afterLogin={() => setRedirect('/')} />
      </div>
    </div>
  );
};

export default Login;
