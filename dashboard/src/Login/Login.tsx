import React, { PureComponent } from 'react';
import LoginForm from './LoginForm';

export class Login extends PureComponent {
  render() {
    return (
      <div className="login">
        <LoginForm />
      </div>
    );
  }
}

export default Login;
