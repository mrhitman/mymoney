import {
  InputGroup,
  FormGroup,
  Button,
  Checkbox,
  Label,
} from '@blueprintjs/core';
import React, { PureComponent } from 'react';

export class Login extends PureComponent {
  render() {
    return (
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <InputGroup id="email" name="email" large type="text" />
        <Label htmlFor="password">Password</Label>
        <InputGroup id="password" name="password" large type="password" />
        <Checkbox>Remember me</Checkbox>
        <Button large text="Submit" type="submit" />
      </FormGroup>
    );
  }
}

export default Login;
