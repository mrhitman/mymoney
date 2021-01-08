import React, { FC } from 'react';
import { Form, Input, DatePicker, Select } from 'antd';
import moment from 'moment';

export interface BudgetFormValues {
  date: moment.Moment;
  deadline: moment.Moment;
  currencyId: string;
}

interface BudgetFormProps {
  onSubmit: (values: BudgetFormValues) => void;
}

export const BudgetForm: FC<BudgetFormProps> = (props) => {
  return (
    <Form>
      <Form.Item label="Budget date range">
        <DatePicker.RangePicker picker="month" />
      </Form.Item>
      <Form.Item label="Currency">
        <Select>
          <Select.Option
            key="096225f7-d38e-5650-8b9f-a19034a5fe6e"
            value="096225f7-d38e-5650-8b9f-a19034a5fe6e"
          >
            UAH
          </Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export default BudgetForm;
