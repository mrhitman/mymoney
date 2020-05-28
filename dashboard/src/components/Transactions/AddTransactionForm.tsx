import { DatePicker, Form, Input, Select } from "antd";
import { Category, Currency } from "common";
import { Formik, FormikProps } from "formik";
import { omit } from "lodash";
import { inject, observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import moment from "moment";
import React, { PureComponent } from "react";
import { api, InjectedStore } from "../../store/Store";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export interface AddTransactionValues {
  currency?: Instance<typeof Currency>;
  category?: Instance<typeof Category>;
  date: moment.Moment;
  sourceWalletId?: string;
  toWalletId?: string;
  type: "outcome" | "income" | "transfer";
  fine?: number;
  amount?: number;
  description: string;
}

interface AddTransactionFormProps {
  onInit: (bag: FormikProps<AddTransactionValues>) => void;
}

interface AddTransactionFormState {
  filterCurrency?: string;
  filterCategory?: string;
}

export class AddTransactionForm extends PureComponent<
  AddTransactionFormProps & Partial<InjectedStore>,
  AddTransactionFormState
> {
  public state: AddTransactionFormState = {
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
          category: undefined,
          date: moment(),
          sourceWalletId: undefined,
          toWalletId: undefined,
          type: "outcome",
          fine: undefined,
          amount: undefined,
          description: "",
        }}
        onSubmit={this.handleSubmit}
        render={(bag) => (
          <Form {...layout} onSubmitCapture={bag.handleSubmit}>
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
                onChange={bag.handleChange("amount")}
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
                onDropdownVisibleChange={() =>
                  this.setState({ filterCurrency: undefined })
                }
                onChange={(id) =>
                  bag.setFieldValue(
                    "currency",
                    store.currencies.find((c) => c.id === id)
                  )
                }
              >
                {this.currencies.map((currency) => (
                  <Select.Option key={currency.id} value={currency.id}>
                    {currency.description} ({currency.name})
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Wallet">
              <Select
                value={bag.values.sourceWalletId}
                onChange={bag.handleChange("sourceWalletId")}
              >
                {store.wallets.map((wallet) => (
                  <Select.Option key={wallet.id} value={wallet.id}>
                    {wallet.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Operation Type">
              <Select
                value={bag.values.type}
                onChange={bag.handleChange("type")}
              >
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="outcome">Outcome</Select.Option>
                <Select.Option value="transfer">Transfer</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category">
              <Select
                showSearch
                filterOption={false}
                onChange={(id) =>
                  bag.setFieldValue(
                    "category",
                    store.categories.find((c) => c.id === id)
                  )
                }
                onSearch={(filter) => this.setState({ filterCategory: filter })}
                onDropdownVisibleChange={() =>
                  this.setState({ filterCategory: undefined })
                }
              >
                {this.categories
                  .filter((category) => category.type === bag.values.type)
                  .map((category) => (
                    <Select.Option key={category.id} value={category.id}>
                      {category.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item label="Description">
              <Input.TextArea />
            </Form.Item>
            {this.props.onInit(bag)}
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

      return `${currency.description} (${currency.name})`
        .toLowerCase()
        .includes(filter);
    });
  }

  protected get categories() {
    return this.store.categories
      .filter(
        (category) =>
          ![
            "TRANSFER_IN",
            "TRANSFER_OUT",
            "TRANSFER_SYS",
            "SYSTEM_EMPTY",
          ].includes(category.name)
      )
      .filter((category) => {
        const filter = this.state.filterCategory?.toLowerCase();

        if (!filter) {
          return true;
        }

        return category.name.toLowerCase().includes(filter);
      });
  }

  protected handleSubmit = (values: AddTransactionValues) => {
    api.client.post("/transactions", {
      ...omit(values, ["category", "currency"]),
      amount: Number(values.amount),
      createdAt: moment().unix(),
      date: values.date.unix(),
      categoryId: values.category?.id,
      currencyId: values.currency?.id,
    });
  };
}

export default inject("store")(observer(AddTransactionForm));
