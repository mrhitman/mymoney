import React, { FC, useState } from 'react';
import { Row, Col, Input, Select, Button, Space, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import { ClearOutlined, FilterOutlined, MoreOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';

interface FilterCriteries {
  search: string | undefined;
  range: [moment.Moment, moment.Moment] | undefined;
  categories: string[];
  currencies: string[];
  amountFrom: number | undefined;
  amountTo: number | undefined;
}

interface FilterGroupProps {
  onFilter: (values: FilterCriteries) => void;
}

export const FilterGroup: FC<FilterGroupProps> = ({ onFilter }) => {
  const [expanded, setExpanded] = useState(false);
  const formik = useFormik<FilterCriteries>({
    initialValues: {
      search: undefined,
      range: undefined,
      categories: [],
      currencies: [],
      amountFrom: undefined,
      amountTo: undefined,
    },
    onSubmit: onFilter,
  });

  return (
    <div style={{ marginBottom: 10 }}>
      <Row gutter={12} style={{ margin: 4 }}>
        <Col>
          <Input.Search
            placeholder="Input transaction id, description or wallet name"
            style={{ width: 400, marginRight: 10 }}
            value={formik.values.search}
            onChange={(e) => formik.setFieldValue('search', e.target.value)}
            enterButton
          />
          <DatePicker.RangePicker
            showTime
            value={formik.values.range}
            ranges={{
              Today: [moment().utc().startOf('day'), moment().utc().endOf('day')],
              'This Week': [moment().utc().startOf('week'), moment().utc().endOf('week')],
              'This Month': [moment().utc().startOf('month'), moment().utc().endOf('month')],
              'Last 7 Days': [moment().utc().subtract(7, 'days'), moment().endOf('day')],
              'Last 30 Days': [moment().utc().subtract(30, 'days'), moment().utc().endOf('day')],
            }}
            onCalendarChange={(values) => {
              formik.setFieldValue('range', values);
            }}
          />
        </Col>
        <Col>
          <Button type="primary" onClick={() => formik.submitForm()} icon={<FilterOutlined />}>
            Apply filters
          </Button>
          <Button onClick={() => setExpanded(!expanded)} icon={<MoreOutlined />}>
            More filters
          </Button>
        </Col>
      </Row>
      {expanded && (
        <Row gutter={12} style={{ margin: 4 }}>
          <Col>
            <Select mode="multiple" placeholder="Currency" style={{ width: 200 }} allowClear>
              <Select.Option value={'UAH'}>UAH</Select.Option>
              <Select.Option value={'USD'}>USD</Select.Option>
            </Select>
          </Col>
          <Col>
            <Select mode="multiple" placeholder="Categories" style={{ width: 230 }} allowClear>
              <Select.Option value={'Food'}>Food</Select.Option>
              <Select.Option value={'Salary'}>Salary</Select.Option>
            </Select>
          </Col>
          <Col>
            <InputNumber style={{ width: 160 }} placeholder="Amount >=" />
          </Col>
          <Col>
            <InputNumber style={{ width: 160 }} placeholder="Amount <=" />
          </Col>
          <Col>
            <Button danger icon={<ClearOutlined />} onClick={() => formik.resetForm()}>
              Clear filters
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};
