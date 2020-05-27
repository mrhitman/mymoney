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

interface AddOutcomeFormState {
  filterCurrency?: string;
  filterCategory?: string;
}

export class AddOutcomeForm extends PureComponent<
  Partial<InjectedStore>,
  AddOutcomeFormState
> {
  public state: AddOutcomeFormState = {
    filterCurrency: undefined,
    filterCategory: undefined,
  };

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
          fine: undefined,
          amount: undefined,
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
              <Input
                placeholder="0"
                prefix={bag.values.currency?.symbol || "$"}
                suffix={bag.values.currency?.name}
              />
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
                showSearch
                filterOption={false}
                value={bag.values.currency?.id}
                onSearch={(filter) => this.setState({ filterCurrency: filter })}
                onChange={(id) =>
                  bag.setFieldValue(
                    "currency",
                    store.currencies.find((c) => c.id === id)
                  )
                }
              >
                {this.currencies.map((currency) => (
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
              <Select
                showSearch
                filterOption={false}
                onSearch={(filter) => this.setState({ filterCategory: filter })}
              >
                {this.categories.map((category) => (
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

  protected get currencies() {
    return this.store.currencies.filter((currency) => {
      const filter = this.state.filterCurrency?.toLowerCase();

      if (!filter) {
        return true;
      }

      return `${currency.country} (${currency.name})`
        .toLowerCase()
        .includes(filter);
    });
  }

  protected get categories() {
    return this.store.categories
      .filter(
        (category) =>
          !["TRANSFER_IN", "TRANSFER_OUT", "TRANSFER_SYS"].includes(
            category.name
          )
      )
      .filter((category) => {
        const filter = this.state.filterCategory?.toLowerCase();

        if (!filter) {
          return true;
        }

        return category.name.toLowerCase().includes(filter);
      });
  }

  protected handleSubmit = () => {};
}

export default inject("store")(observer(AddOutcomeForm));
