import { DatePicker, Form, Input, Select } from 'antd';
import { Formik } from 'formik';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { InjectedStore } from '../../store/Store';

export class AddOutcomeForm extends PureComponent<Partial<InjectedStore>> {
  public get store() {
    return this.props.store!;
  }
  public render() {
    return (
      <Formik
        initialValues={{
          amount: 0,
          currencyId: undefined,
          fromWalletId: undefined,
          date: moment(),
          toWalletId: undefined,
          fine: 0,
        }}
        onSubmit={this.handleSubmit}
        render={(bag) => (
          <Form>
            <Form.Item
              label="Amount"
              name="amount"
              initialValue={bag.values.amount}
              rules={[{ required: true, message: 'Input amount' }]}
            >
              <Input prefix="￥" suffix="RMB" />
            </Form.Item>
            <Form.Item
              label="Date"
              initialValue={bag.values.date}
              rules={[{ required: true, message: 'Input trx date' }]}
            >
              <DatePicker showTime defaultValue={bag.values.date} />
            </Form.Item>
            <Form.Item label="Wallet">
              <Select>
                {this.store.wallets.map((wallet) => (
                  <Select.Option key={wallet.id} value={wallet.id}>
                    {wallet.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Category">
              <Select>
                {this.store.categories.map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        )}
      />
    );
  }

  protected handleSubmit = () => {};
}

export default inject('store')(observer(AddOutcomeForm));
