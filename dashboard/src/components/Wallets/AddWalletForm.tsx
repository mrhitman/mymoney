import { Checkbox, Form, Input } from 'antd';
import { Formik } from 'formik';
import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { InjectedStore } from 'src/store/Store';
import { formLayout } from '../misc/Layout';

export interface AddWalletValues {
  name: string;
  description: string;
  allow_negative_balance: boolean;
  use_in_balance: boolean;
  use_in_analytics: boolean;
  pockets: Array<{}>;
}

class AddWalletForm extends PureComponent<
  Partial<InjectedStore> & WithTranslation
> {
  public get store() {
    return this.props.store!;
  }

  public render() {
    return (
      <Formik
        initialValues={{
          name: '',
          description: '',
        }}
        onSubmit={this.handleSubmit}
        render={(bag) => (
          <Form {...formLayout} onSubmitCapture={bag.handleSubmit}>
            <Form.Item label="Name" name="name">
              <Input onChange={bag.handleChange('name')} />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input onChange={bag.handleChange('description')} />
            </Form.Item>
            <Form.Item
              label="Allow negative balance"
              name="allow_negative_balance"
            >
              <Checkbox />
            </Form.Item>
            <Form.Item label="Allow negative balance" name="use_in_balance">
              <Checkbox />
            </Form.Item>
            <Form.Item label="Allow negative balance" name="use_in_analytics">
              <Checkbox />
            </Form.Item>
          </Form>
        )}
      />
    );
  }

  protected handleSubmit = () => {};
}

export default withTranslation()(inject('store')(observer(AddWalletForm)));
