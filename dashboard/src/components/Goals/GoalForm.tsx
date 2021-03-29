import { Form, Input, Select } from 'antd';
import { FormikProps } from 'formik';
import React, { FC } from 'react';
import { useGetCurrenciesQuery } from 'src/generated/graphql';

export interface GoalFormProps {
  formik: FormikProps<any>;
}

export const GoalForm: FC<GoalFormProps> = ({ formik }) => {
  const { data: currencies } = useGetCurrenciesQuery();
  return (
    <Form labelCol={{ span: 8 }}>
      <Form.Item label="Name">
        <Input
          value={formik.values.name}
          onChange={(e) => formik.setFieldValue('name', e.target.value)}
        />
      </Form.Item>
      <Form.Item name="goal" label="Goal" initialValue={formik.values.goal}>
        <Input
          type="number"
          value={formik.values.goal}
          onChange={formik.handleChange('goal')}
        />
      </Form.Item>
      <Form.Item
        name="progress"
        label={formik.values.id ? 'Progress' : 'Initial progress'}
        initialValue={formik.values.progress}
      >
        <Input
          name="progress"
          type="number"
          value={formik.values.progress}
          onChange={formik.handleChange('progress')}
        />
      </Form.Item>
      <Form.Item label="Currency">
        <Select
          showSearch
          placeholder="Currencies"
          style={{ width: 200 }}
          value={formik.values.currencyId}
          filterOption={(inputValue, option) =>
            option?.children.toLowerCase().includes(inputValue.toLowerCase())
          }
          onChange={(currencyId) => {
            formik.setFieldValue('currencyId', currencyId);
          }}
        >
          {currencies?.currencies.map((currency) => (
            <Select.Option key={currency.id} value={currency.id}>
              {currency.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
