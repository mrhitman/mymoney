import { Form, Input, Switch } from 'antd';
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
          allow_negative_balance: true,
          use_in_balance: true,
          use_in_analytics: true,
        }}
        onSubmit={this.handleSubmit}
        render={(bag) => (
          <Form {...formLayout} onSubmitCapture={bag.handleSubmit}>
            <Form.Item label="Name" name="name">
              <Input onChange={bag.handleChange('name')} />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea onChange={bag.handleChange('description')} />
            </Form.Item>
            <Form.Item
              label="Allow negative balance"
              name="allow_negative_balance"
            >
              <Switch
                defaultChecked={bag.values.allow_negative_balance}
                onChange={(checked: boolean) =>
                  bag.setFieldValue('allow_negative_balance', checked)
                }
              />
            </Form.Item>
            <Form.Item label="Allow negative balance" name="use_in_balance">
              <Switch
                defaultChecked={bag.values.use_in_balance}
                onChange={(checked: boolean) =>
                  bag.setFieldValue('use_in_balance', checked)
                }
              />
            </Form.Item>
            <Form.Item label="Allow negative balance" name="use_in_analytics">
              <Switch
                defaultChecked={bag.values.use_in_analytics}
                onChange={(checked: boolean) =>
                  bag.setFieldValue('use_in_analytics', checked)
                }
              />
            </Form.Item>
          </Form>
        )}
      />
    );
  }

  protected handleSubmit = () => {};
}

export default withTranslation()(inject('store')(observer(AddWalletForm)));
