import { DatePicker, Form, Input, Select } from 'antd';
import { FormikProps } from 'formik';
import { isArray } from 'lodash';
import { OptionData, OptionGroupData } from 'rc-select/lib/interface';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TransactionFragment,
  TransactionType,
  useGetCategoriesAndCurrenciesForCreateTrxQuery,
} from 'src/generated/graphql';
import { formLayout } from '../misc/Layout';

export type TransactionFormTypes = Pick<
  TransactionFragment,
  | 'type'
  | 'amount'
  | 'date'
  | 'description'
  | 'sourceWalletId'
  | 'destinationWalletId'
  | 'categoryId'
  | 'currencyId'
>;

interface Props {
  formik: FormikProps<TransactionFormTypes>;
}

const systemCategories = ['TRANSFER_IN', 'TRANSFER_OUT', 'TRANSFER_SYS'];

function filterOptionFn(
  input: string,
  option?: OptionData | OptionGroupData,
): boolean {
  const value = input.toLocaleLowerCase();
  const children = option?.children;
  if (!children) return false;
  return isArray(children)
    ? children.some((str: string) => str.toLowerCase().includes(value))
    : children.toLowerCase().includes(value);
}

export const TransactionForm: FC<Props> = ({ formik }) => {
  const { t } = useTranslation();
  const { data, loading } = useGetCategoriesAndCurrenciesForCreateTrxQuery();
  let defaultCategoryId;

  useEffect(() => {
    defaultCategoryId = data?.categories.find(
      (c) =>
        c.type &&
        c.type.toString() === formik.values.type.toString() &&
        c.name === 'SYSTEM_EMPTY',
    )?.id;
  }, [formik.values.categoryId]);

  return (
    <Form {...formLayout}>
      <Form.Item
        label="Amount"
        name="amount"
        validateStatus={formik.errors.amount ? 'error' : 'success'}
        initialValue={formik.values.amount}
        rules={[{ required: true, message: 'Input amount' }]}
      >
        <Input
          type="number"
          value={formik.values.amount}
          onChange={formik.handleChange('amount')}
        />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea
          value={formik.values.description || ''}
          onChange={formik.handleChange('description')}
        />
      </Form.Item>
      <Form.Item
        label="Date"
        name="date"
        validateStatus={formik.errors.date ? 'error' : 'success'}
        initialValue={formik.values.date}
        rules={[{ required: true, message: 'Input trx date' }]}
      >
        <DatePicker showTime defaultValue={formik.values.date} />
      </Form.Item>
      {formik.values.type === TransactionType.Income && (
        <Form.Item label="To Wallet" name="destinationWalletId">
          <Select
            loading={loading}
            onChange={(value) =>
              formik.setFieldValue('destinationWalletId', value)
            }
          >
            {data?.wallets.map((wallet) => (
              <Select.Option key={wallet.id} value={wallet.id}>
                {wallet.name}, {wallet.description}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}
      {formik.values.type === TransactionType.Outcome && (
        <Form.Item label="From Wallet" name="sourceWalletId">
          <Select
            loading={loading}
            onChange={(value) => formik.setFieldValue('sourceWalletId', value)}
          >
            {data?.wallets.map((wallet) => (
              <Select.Option key={wallet.id} value={wallet.id}>
                {wallet.name}, {wallet.description}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}
      <Form.Item
        label="Currency"
        validateStatus={formik.errors.currencyId ? 'error' : 'success'}
        initialValue={formik.values.currencyId}
        rules={[{ required: true, message: 'Choose currency for trx' }]}
      >
        <Select
          showSearch
          loading={loading}
          onChange={(value) => formik.setFieldValue('currencyId', value)}
          filterOption={filterOptionFn}
        >
          {data?.currencies.map((currency) => (
            <Select.Option key={currency.id} value={currency.id}>
              {currency.name}, {currency.description}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Category">
        <Select
          showSearch
          loading={loading}
          onChange={(value) => formik.setFieldValue('categoryId', value)}
          defaultValue={defaultCategoryId}
          filterOption={filterOptionFn}
        >
          {data?.categories
            .filter((category) => !systemCategories.includes(category.name))
            .filter(
              (category) => category.type?.toString() === formik.values.type,
            )
            .map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {t(category.name)}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
