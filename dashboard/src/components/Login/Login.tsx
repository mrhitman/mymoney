import React from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from './LoginForm';

export const Login: React.FC = (props) => {
  const history = useHistory();

  // if (props.store?.isAuthorized) {
  // return <Redirect to="/" exact />;
  // }

  return (
    <div className="App">
      <div className="login">
        <LoginForm afterLogin={() => history.replace({ pathname: '/' })} />
      </div>
    </div>
  );
};

export default Login;
