import {useMutation} from '@apollo/client';
import {Button, Checkbox, Form, Input} from 'antd';
import {Formik} from 'formik';
import {loader} from 'graphql.macro';
import React, {FC} from 'react';
import {loginLayout, loginTailLayout} from '../misc/layouts';

export interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  afterLogin: () => void;
}

const LoginForm: FC<LoginFormProps> = (props) => {
  const LoginQuery = loader('src/queries/login.graphql');
  const [login] = useMutation(LoginQuery);

  const handleSubmit = async (values: LoginFormValues) => {
    const {data} = await login({variables: values});
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
          {...loginLayout}
          initialValues={bag.values}
          onFinish={bag.submitForm}
          onChange={bag.handleChange}
        >
          <Form.Item
            label="Email"
            name="email"
            initialValue={bag.values.email}
            rules={[{required: true, message: 'Please input your email!'}]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {required: true, message: 'Please input your password!'},
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...loginTailLayout} name="remember" valuePropName="checked">
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
          </Form.Item>
        </Form>
      )}
    />
  );
};

export default LoginForm;
