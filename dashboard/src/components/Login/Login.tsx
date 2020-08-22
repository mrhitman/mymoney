import React from 'react';
import {useHistory, Redirect} from 'react-router-dom';
import LoginForm from './LoginForm';

export const Login: React.FC = () => {
  const history = useHistory();

  if (localStorage.getItem('accessToken')) {
    return <Redirect to="/" exact />;
  }

  const afterLogin = () => history.replace({pathname: '/'});
  return (
    <div className="App">
      <div className="login">
        <LoginForm afterLogin={afterLogin} />
      </div>
    </div>
  );
};

export default Login;
