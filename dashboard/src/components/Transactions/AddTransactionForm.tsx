import { Checkbox, DatePicker, Form, Input, Select, Tabs } from 'antd';
import { Category, Currency } from 'common';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { inject, observer } from 'mobx-react';
import { Instance } from 'mobx-state-tree';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { InjectedStore } from '../../store/Store';
import { formLayout } from '../misc/Layout';

export interface AddTransactionValues {
  currencyId?: Instance<typeof Currency>;
  categoryId?: Instance<typeof Category>;
  date: moment.Moment;
  sourceWalletId?: string;
  destinationWalletId?: string;
  type: string;
  fine?: number;
  amount?: number;
  isNecessary?: boolean;
  isTemplate?: boolean;
  description: string;
}

interface AddTransactionFormProps {
  onInit: (bag: FormikProps<AddTransactionValues>) => void;
  onSubmit: () => void;
}

interface AddTransactionFormState {
  filterCurrency?: string;
  filterCategory?: string;
}

export class AddTransactionForm extends PureComponent<
  AddTransactionFormProps & Partial<InjectedStore> & WithTranslation,
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
        initialValues={
          {
            currencyId: store.currencies.find(
              (c) => c.name === store.account?.settings.primaryCurrencyName
            ),
            categoryId: undefined,
            date: moment(),
            sourceWalletId: undefined,
            destinationWalletId: undefined,
            type: 'outcome',
            fine: undefined,
            amount: undefined,
            description: '',
            isNecessary: false,
            isTemplate: false,
          } as AddTransactionValues
        }
        onSubmit={this.handleSubmit}
        render={(bag) => (
          <Form {...formLayout} onSubmitCapture={bag.handleSubmit}>
            <Form.Item
              validateStatus={bag.errors.amount ? 'error' : 'success'}
              label="Amount"
              name="amount"
              initialValue={bag.values.amount}
              rules={[{ required: true, message: 'Input amount' }]}
            >
              <Input
                placeholder="0"
                prefix={bag.values.currencyId?.symbol || '$'}
                suffix={bag.values.currencyId?.name}
                onChange={bag.handleChange('amount')}
              />
            </Form.Item>
            {bag.values.type === 'transfer' && (
              <Form.Item
                validateStatus={bag.errors.amount ? 'error' : 'success'}
                label="Fine"
                name="fine"
                initialValue={bag.values.fine}
              >
                <Input
                  placeholder="0"
                  prefix={bag.values.currencyId?.symbol || '$'}
                  suffix={bag.values.currencyId?.name}
                  onChange={bag.handleChange('fine')}
                />
              </Form.Item>
            )}
            <Form.Item
              label="Date"
              validateStatus={bag.errors.date ? 'error' : 'success'}
              initialValue={bag.values.date}
              rules={[{ required: true, message: 'Input trx date' }]}
            >
              <DatePicker showTime defaultValue={bag.values.date} />
            </Form.Item>
            <Form.Item
              label="Currency"
              validateStatus={bag.errors.currencyId ? 'error' : 'success'}
            >
              <Select
                showSearch
                filterOption={false}
                value={bag.values.currencyId?.id}
                onSearch={(filter) => this.setState({ filterCurrency: filter })}
                onDropdownVisibleChange={() =>
                  this.setState({ filterCurrency: undefined })
                }
                onChange={(id) =>
                  bag.setFieldValue(
                    'currencyId',
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
            {bag.values.type !== 'income' && (
              <Form.Item
                label="From Wallet"
                validateStatus={bag.errors.sourceWalletId ? 'error' : 'success'}
              >
                <Select
                  value={bag.values.sourceWalletId}
                  onChange={bag.handleChange('sourceWalletId')}
                >
                  {store.wallets
                    .filter((wallet) =>
                      bag.values.type === 'transfer'
                        ? wallet.id !== bag.values.destinationWalletId
                        : true
                    )
                    .map((wallet) => (
                      <Select.Option key={wallet.id} value={wallet.id}>
                        {wallet.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            )}
            {bag.values.type !== 'outcome' && (
              <Form.Item
                label="To Wallet"
                validateStatus={bag.errors.sourceWalletId ? 'error' : 'success'}
              >
                <Select
                  value={bag.values.destinationWalletId}
                  onChange={bag.handleChange('destinationWalletId')}
                >
                  {store.wallets
                    .filter((wallet) =>
                      bag.values.type === 'transfer'
                        ? wallet.id !== bag.values.sourceWalletId
                        : true
                    )
                    .map((wallet) => (
                      <Select.Option key={wallet.id} value={wallet.id}>
                        {wallet.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            )}
            <Form.Item
              label="Operation Type"
              validateStatus={bag.errors.type ? 'error' : 'success'}
            >
              <Select
                value={bag.values.type}
                onChange={bag.handleChange('type')}
              >
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="outcome">Outcome</Select.Option>
                <Select.Option value="transfer">Transfer</Select.Option>
              </Select>
            </Form.Item>
            {bag.values.type !== 'transfer' && (
              <Form.Item
                label="Category"
                validateStatus={bag.errors.categoryId ? 'error' : 'success'}
              >
                <Select
                  showSearch
                  filterOption={false}
                  onChange={(id) =>
                    bag.setFieldValue(
                      'categoryId',
                      store.categories.find((c) => c.id === id)
                    )
                  }
                  onSearch={(filter) =>
                    this.setState({ filterCategory: filter })
                  }
                  onDropdownVisibleChange={() =>
                    this.setState({ filterCategory: undefined })
                  }
                >
                  {this.categories
                    .filter((category) => category.type === bag.values.type)
                    .map((category) => (
                      <Select.Option key={category.id} value={category.id}>
                        {this.props.t(category.name)}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            )}
            <Form.Item labelCol={{ span: 22 }} label="Is Necessary">
              <Checkbox
                checked={bag.values.isNecessary}
                onChange={(e) =>
                  bag.setFieldValue('isNecessary', e.target.checked)
                }
              />
            </Form.Item>
            <Form.Item labelCol={{ span: 22 }} label="Repeatable operation">
              <Checkbox
                checked={bag.values.isTemplate}
                onChange={(e) =>
                  bag.setFieldValue('isTemplate', e.target.checked)
                }
              />
            </Form.Item>
            {bag.values.isTemplate && (
              <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="day" key="1">
                  <ul>
                    <li>mon</li>
                    <li>tue</li>
                    <li>wed</li>
                    <li>thu</li>
                    <li>fri</li>
                    <li>sat</li>
                    <li>sun</li>
                  </ul>
                </Tabs.TabPane>
                <Tabs.TabPane tab="week" key="2" />
                <Tabs.TabPane tab="month" key="3" />
                <Tabs.TabPane tab="year" key="4" />
              </Tabs>
            )}
            <Form.Item
              label="Description"
              validateStatus={bag.errors.description ? 'error' : 'success'}
            >
              <Input.TextArea
                value={bag.values.description}
                onChange={bag.handleChange('description')}
              />
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
            'TRANSFER_IN',
            'TRANSFER_OUT',
            'TRANSFER_SYS',
            'SYSTEM_EMPTY',
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

  protected handleSubmit = async (
    values: AddTransactionValues,
    formikHelpers: FormikHelpers<AddTransactionValues>
  ) => {
    try {
      await this.store.addTransaction(values);
      this.props.onSubmit();
      formikHelpers.resetForm();
    } catch (e) {
      e?.response?.data.message.map((message: string) =>
        formikHelpers.setFieldError(message.split(' ')[0], message)
      );
    }
  };
}

export default withTranslation()(inject('store')(observer(AddTransactionForm)));
