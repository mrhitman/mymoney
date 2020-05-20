import React from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from './LoginForm';

export const Login: React.FC = () => {
  const history = useHistory();

  return (
    <div className="login">
      <LoginForm afterLogin={() => history.replace({ pathname: '/' })} />
    </div>
  );
};

export default Login;
