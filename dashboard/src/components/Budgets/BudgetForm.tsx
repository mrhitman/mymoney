import { DatePicker, Form, Select } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';

export interface BudgetFormValues {
  date: moment.Moment;
  deadline: moment.Moment;
  currencyId: string;
}

interface BudgetFormProps {
  formik: any;
}

export const BudgetForm: FC<BudgetFormProps> = (props) => {
  return (
    <Form>
      <Form.Item label="Budget date range">
        <DatePicker.RangePicker
          picker="month"
          value={[moment(props.formik.values.date), moment(props.formik.values.deadline)]}
          allowClear={false}
          allowEmpty={[false, false]}
          onChange={(range) => {
            if (!range) {
              return;
            }

            props.formik.setFieldValue('date', range[0]?.toDate());
            props.formik.setFieldValue('deadline', range[1]?.toDate());
          }}
        />
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
