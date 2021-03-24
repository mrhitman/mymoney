import { DatePicker, Form, Input } from 'antd';
import { FormikProps } from 'formik';
import React, { FC } from 'react';
import { Transaction } from 'src/generated/graphql';

export type TransactionFormTypes = Pick<
  Transaction,
  'type' | 'amount' | 'date' | 'description'
>;

interface Props {
  formik: FormikProps<TransactionFormTypes>;
}

export const TransactionForm: FC<Props> = ({ formik }) => {
  return (
    <Form labelCol={{ span: 8 }}>
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
    </Form>
  );
};
