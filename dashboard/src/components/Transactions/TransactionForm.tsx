import { DatePicker, Form, Input, Select } from 'antd';
import { FormikProps } from 'formik';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TransactionFragment,
  TransactionType,
  useGetCategoriesQuery,
  useGetWalletsQuery,
} from 'src/generated/graphql';
import { formLayout } from '../misc/Layout';

export type TransactionFormTypes = Pick<
  TransactionFragment,
  | 'type'
  | 'amount'
  | 'date'
  | 'description'
  | 'sourceWallet'
  | 'destinationWallet'
  | 'category'
  | 'currency'
>;

interface Props {
  formik: FormikProps<TransactionFormTypes>;
}

export const TransactionForm: FC<Props> = ({ formik }) => {
  const { t } = useTranslation();
  // @TODO use single query
  const { data: wallets } = useGetWalletsQuery();
  const { data: categories } = useGetCategoriesQuery();
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
        <Input
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
        <Form.Item label="To Wallet" name="sourceWalletId">
          <Select>
            {wallets?.wallets.map((wallet) => (
              <Select.Option key={wallet.id} value={wallet.id}>
                {wallet.name}, {wallet.description}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}
      {formik.values.type === TransactionType.Outcome && (
        <Form.Item label="From Wallet">
          <Select>
            {wallets?.wallets.map((wallet) => (
              <Select.Option key={wallet.id} value={wallet.id}>
                {wallet.name}, {wallet.description}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}
      <Form.Item label="Category">
        <Select>
          {categories?.categories
            .filter(
              (category) =>
                !['TRANSFER_IN', 'TRANSFER_OUT'].includes(category.name),
            )
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
