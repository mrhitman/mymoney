import { DatePicker, Form, Input, Select } from "antd";
import { Formik } from "formik";
import { inject, observer } from "mobx-react";
import moment from "moment";
import React, { PureComponent } from "react";
import { InjectedStore } from "../../store/Store";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export class AddOutcomeForm extends PureComponent<Partial<InjectedStore>> {
  public get store() {
    return this.props.store!;
  }

  public render() {
    const store = this.store;
    return (
      <Formik
        initialValues={{
          currency: store.currencies.find(
            (c) => c.name === store.account?.settings.primaryCurrencyName
          ),
          date: moment(),
          fromWalletId: undefined,
          toWalletId: undefined,
          type: "outcome",
          fine: 0,
          amount: 0,
          description: "",
        }}
        onSubmit={this.handleSubmit}
        render={(bag) => (
          <Form {...layout}>
            <Form.Item
              label="Amount"
              name="amount"
              initialValue={bag.values.amount}
              rules={[{ required: true, message: "Input amount" }]}
            >
              <Input prefix="$" suffix={bag.values.currency?.name} />
            </Form.Item>
            <Form.Item
              label="Date"
              initialValue={bag.values.date}
              rules={[{ required: true, message: "Input trx date" }]}
            >
              <DatePicker showTime defaultValue={bag.values.date} />
            </Form.Item>
            <Form.Item label="Currency">
              <Select
                value={bag.values.currency?.id}
                onChange={(id) =>
                  bag.setFieldValue(
                    "currency",
                    store.currencies.find((c) => c.id === id)
                  )
                }
              >
                {store.currencies.map((currency) => (
                  <Select.Option key={currency.id} value={currency.id}>
                    {currency.country} ({currency.name})
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Wallet">
              <Select>
                {store.wallets.map((wallet) => (
                  <Select.Option key={wallet.id} value={wallet.id}>
                    {wallet.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Operation Type">
              <Select value={bag.values.type}>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="outcome">Outcome</Select.Option>
                <Select.Option value="transfer">Transfer</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category">
              <Select>
                {store.categories.map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Description">
              <Input.TextArea />
            </Form.Item>
          </Form>
        )}
      />
    );
  }

  protected handleSubmit = () => {};
}

export default inject("store")(observer(AddOutcomeForm));
