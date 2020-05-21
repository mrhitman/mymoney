import { Button, Checkbox, Input, Form } from "antd";
import { Formik } from "formik";
import { inject, observer } from "mobx-react";
import React from "react";
import { InjectedStore } from "../../store/Store";

export interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
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

class LoginForm extends React.Component<
  LoginFormProps & Partial<InjectedStore>
> {
  public get store() {
    return (this.props as InjectedStore).store;
  }

  public render() {
    return (
      <Formik
        initialValues={{
          username: "",
          password: "",
          remember: false,
        }}
        onSubmit={this.handleSubmit}
        render={(bag) => (
          <Form
            {...layout}
            initialValues={bag.values}
            onFinish={bag.submitForm}
            onChange={bag.handleChange}
          >
            <Form.Item
              label="Email"
              name="username"
              initialValue={bag.values.username}
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
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

  protected handleSubmit = async (values: LoginFormValues) => {
    try {
      await this.store.login(values);
      this.props.afterLogin();
    } catch (e) {}
  };
}

export default inject("store")(observer(LoginForm));
