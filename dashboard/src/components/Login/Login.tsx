import { inject, observer } from 'mobx-react';
import { IReactComponent } from 'mobx-react/dist/types/IReactComponent';
import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { InjectedStore } from '../../store/Store';
import LoginForm from './LoginForm';

export const Login: React.FC<Partial<InjectedStore>> = (props) => {
  const history = useHistory();

  if (props.store?.isAuthorized) {
    return <Redirect to="/" exact />;
  }

  return (
    <div className="App">
      <div className="login">
        <LoginForm afterLogin={() => history.replace({ pathname: '/' })} />
      </div>
    </div>
  );
};

export default inject('store')(observer<IReactComponent>(Login));
