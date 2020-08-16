import { Button, Checkbox, Input, Form } from 'antd';
import { Formik } from 'formik';
import React, { FC } from 'react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';

export interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  afterLogin: () => void;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginForm: FC<LoginFormProps> = (props) => {
  const LoginQuery = loader('src/queries/login.graphql');
  const [login] = useMutation(LoginQuery);

  const handleSubmit = async (values: LoginFormValues) => {
    const { data } = await login({ variables: values });
    localStorage.setItem('accessToken', data.login.accessToken);
    localStorage.setItem('refreshToken', data.login.refreshToken);
    props.afterLogin();
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
          {...layout}
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
            rules={[
              { required: true, message: 'Please input your password!' },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              onSubmit={bag.handleSubmit}
            >
              Submit
              </Button>
          </Form.Item>
        </Form>
      )}
    />
  );
}

export default LoginForm;
