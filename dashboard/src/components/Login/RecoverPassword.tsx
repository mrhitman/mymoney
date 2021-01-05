import { Form, Input, Button, notification } from 'antd';
import React, { FC, useState } from 'react';
import { useRecoveryPasswordMutation } from 'src/generated/graphql';
import { Redirect } from 'react-router-dom';

const openNotificationWithIcon = (type: 'success' | 'error') => {
  notification[type]({
    message: 'Password recovering',
    description:
      type === 'success' ? 'Email with recover password link sent to your email' : 'No such user',
  });
};

const RecoverPassword: FC = () => {
  const [recoverPassword] = useRecoveryPasswordMutation();
  const [email, setEmail] = useState('');
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="App">
      <div className="login">
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Form.Item
            style={{ width: 300 }}
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              onClick={() => {
                recoverPassword({ variables: { email } })
                  .then(() => openNotificationWithIcon('success'))
                  .then(() => setRedirect(true))
                  .catch(() => openNotificationWithIcon('error'));
              }}
            >
              Recover
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RecoverPassword;
