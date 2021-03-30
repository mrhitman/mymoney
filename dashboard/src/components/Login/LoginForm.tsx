import { Button, Checkbox, Form, Input } from 'antd';
import { Formik } from 'formik';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useLoginMutation } from 'src/generated/graphql';
import { loginLayout, loginTailLayout } from '../misc/layouts';
import { login as authLogin } from 'src/auth';

export interface LoginFormValues {
  email: string;
  password: string;
}

interface Props {
  afterLogin: () => void;
}

const LoginForm: FC<Props> = (props) => {
  const [login] = useLoginMutation();

  const handleSubmit = async (values: LoginFormValues) => {
    const { data } = await login({ variables: values });

    if (data) {
      authLogin({
        accessToken: data.login.accessToken,
        refreshToken: data.login.refreshToken,
      });
      props.afterLogin();
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={handleSubmit}
      render={(bag) => (
        <Form
          {...loginLayout}
          initialValues={bag.values}
          onFinish={bag.submitForm}
          onChange={bag.handleChange}
        >
          <Form.Item
            label="Email"
            name="email"
            initialValue={bag.values.email}
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            {...loginTailLayout}
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...loginTailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              onSubmit={bag.handleSubmit}
            >
              Submit
            </Button>
            {'    or    '}
            <Link to="/register">Register</Link>
            <br /> or
            <Link to="/recover-password">Recover password</Link>
          </Form.Item>
        </Form>
      )}
    />
  );
};

export default LoginForm;
