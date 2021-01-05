import { Button, Form, Input, notification } from 'antd';
import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
import { useChangePasswordMutation } from '../../generated/graphql';
import { useRouteMatch } from 'react-router';
import { Redirect } from 'react-router-dom';

const openNotificationWithIcon = (type: 'success' | 'error') => {
  notification[type]({
    message: 'Password changing',
    description: type === 'success' ? 'New password saved' : "Can't save new password",
  });
};

const ChangePassword: FC = () => {
  const [changePassword] = useChangePasswordMutation();
  const [redirect, setRedirect] = useState(false);
  const { params } = useRouteMatch<{ token: string }>();

  const formik = useFormik({
    initialValues: {
      password: '',
      passwordConfirm: '',
    },
    validateOnChange: true,
    onSubmit: (values) => {
      changePassword({
        variables: {
          password: values.password,
        },
        context: {
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        },
      })
        .then(() => openNotificationWithIcon('success'))
        .then(() => setRedirect(true))
        .catch(() => openNotificationWithIcon('error'));
    },
    validate: (values) => {
      const errors: any = {};

      if (values.password !== values.passwordConfirm) {
        errors['password'] = 'Passwords should be equal';
      }

      if (values.password.length < 5) {
        errors['password'] = 'Passwords should be longer than 5 symbols';
      }

      return errors;
    },
  });

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="App">
      <div className="login">
        <Form labelCol={{ span: 12 }} wrapperCol={{ span: 14 }}>
          <Form.Item
            label="Password"
            rules={[{ required: true, message: 'Please input your new password!' }]}
            validateStatus={formik.errors.password ? 'error' : 'success'}
            help={formik.errors.password}
          >
            <Input.Password
              value={formik.values.password}
              onChange={(e) => formik.setFieldValue('password', e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Password confirm"
            name="passwordConfirm"
            rules={[{ required: true, message: 'Please repeat you new password!' }]}
          >
            <Input.Password
              value={formik.values.passwordConfirm}
              onChange={(e) => formik.setFieldValue('passwordConfirm', e.target.value)}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" onClick={() => formik.submitForm()}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
