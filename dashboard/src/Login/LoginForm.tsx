import {
  Button,
  Checkbox,
  ControlGroup,
  FormGroup,
  InputGroup,
  Intent,
  Label,
  Position,
  Toaster,
} from "@blueprintjs/core";
import { Formik } from "formik";
import React, { PureComponent } from "react";
import api from "../utils/api";

interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

export class LoginForm extends PureComponent {
  private toaster = React.createRef<Toaster>();

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
          <FormGroup>
            <ControlGroup vertical>
              <Toaster position={Position.TOP} ref={this.toaster} />
              <Label htmlFor="email">Email</Label>
              <InputGroup
                id="email"
                name="email"
                large
                type="text"
                value={bag.values.username}
                onChange={bag.handleChange("username")}
              />

              <Label htmlFor="password">Password</Label>
              <InputGroup
                id="password"
                name="password"
                large
                type="password"
                value={bag.values.password}
                onChange={bag.handleChange("password")}
              />

              <Checkbox>Remember me</Checkbox>
              <Button
                large
                text="Submit"
                type="submit"
                onClick={() => bag.handleSubmit()}
              />
            </ControlGroup>
          </FormGroup>
        )}
      />
    );
  }

  protected handleSubmit = async (values: LoginFormValues) => {
    try {
      const response = await api.login(values.username, values.password);
      this.toaster.current?.show({
        message: "Welcome " + response.accessToken,
        intent: Intent.SUCCESS,
      });
    } catch (e) {
      if (e.response.status === 401) {
        this.toaster.current?.show({
          message: "No such user or invalid password",
          intent: Intent.WARNING,
        });
      }

      if (e.response.status === 500) {
        this.toaster.current?.show({
          message: "Server isn't working at the moment",
          intent: Intent.WARNING,
        });
      }
    }
  };
}

export default LoginForm;
