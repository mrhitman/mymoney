import { ClearOutlined, ExportOutlined, FilterOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Input, InputNumber, Row, Select } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TransactionType, useGetFilterGroupQuery } from 'src/generated/graphql';
import ranges from '../misc/DateRanges';

export interface FilterCriteries {
  search: string | undefined;
  range: [moment.Moment, moment.Moment] | undefined;
  categories: string[];
  currencies: string[];
  wallets: string[];
  amountFrom: number | undefined;
  amountTo: number | undefined;
}

interface FilterGroupProps {
  type?: TransactionType;
  onFilter: (values: FilterCriteries) => void;
  onReset: () => void;
}

export const FilterGroup: FC<FilterGroupProps> = ({ onFilter, onReset, type }) => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();
  const { data } = useGetFilterGroupQuery({
    variables: {
      type,
    },
  });
  const formik = useFormik<FilterCriteries>({
    initialValues: {
      search: undefined,
      range: undefined,
      categories: [],
      currencies: [],
      wallets: [],
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
            placeholder="Input transaction id or description "
            style={{ width: 400, marginRight: 10 }}
            value={formik.values.search}
            onChange={(e) => formik.setFieldValue('search', e.target.value)}
            onSubmit={() => formik.handleSubmit()}
            onPressEnter={() => formik.handleSubmit()}
            enterButton
          />
          <DatePicker.RangePicker
            showTime
            value={formik.values.range}
            ranges={ranges}
            onCalendarChange={(values) => {
              formik.setFieldValue('range', values);
            }}
          />
        </Col>
        <Col>
          <Button type="primary" onClick={formik.submitForm} icon={<FilterOutlined />}>
            Apply filters
          </Button>
          <Button onClick={() => setExpanded(!expanded)} icon={<MoreOutlined />}>
            {expanded ? 'Less' : 'More'} filters
          </Button>
        </Col>
        <Col offset={4}>
          <Button onClick={() => { }} icon={<ExportOutlined />}>
            Export
          </Button>
        </Col>
      </Row>
      {expanded && (
        <Row gutter={12} style={{ margin: 4 }}>
          <Col>
            <Select
              mode="multiple"
              placeholder="Wallets"
              style={{ width: 230 }}
              allowClear
              value={formik.values.wallets}
              filterOption={(inputValue, option) =>
                option?.children.toLowerCase().includes(inputValue.toLowerCase())
              }
              onChange={(wallets) => formik.setFieldValue('wallets', wallets)}
            >
              {data?.wallets.map((wallet) => (
                <Select.Option key={wallet.id} value={wallet.id}>
                  {wallet.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col>
            <Select
              mode="multiple"
              placeholder="Currencies"
              style={{ width: 200 }}
              allowClear
              value={formik.values.currencies}
              filterOption={(inputValue, option) =>
                option?.children.toLowerCase().includes(inputValue.toLowerCase())
              }
              onChange={(currencies) => formik.setFieldValue('currencies', currencies)}
            >
              {data?.currencies.map((currency) => (
                <Select.Option key={currency.id} value={currency.id}>
                  {currency.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col>
            <Select
              mode="multiple"
              placeholder="Categories"
              style={{ width: 230 }}
              allowClear
              value={formik.values.categories}
              filterOption={(inputValue, option) =>
                option?.children.toLowerCase().includes(inputValue.toLowerCase())
              }
              onChange={(categories) => formik.setFieldValue('categories', categories)}
            >
              {data?.categories
                .filter((category) => !['TRANSFER_IN', 'TRANSFER_OUT'].includes(category.name))
                .map((category) => (
                  <Select.Option value={category.id}>{t(category.name)}</Select.Option>
                ))}
            </Select>
          </Col>
          <Col>
            <InputNumber
              value={formik.values.amountFrom}
              onChange={(value) => formik.setFieldValue('amountFrom', value)}
              style={{ width: 160 }}
              placeholder="Amount >="
            />
          </Col>
          <Col>
            <InputNumber
              value={formik.values.amountTo}
              onChange={(value) => formik.setFieldValue('amountTo', value)}
              style={{ width: 160 }}
              placeholder="Amount <="
            />
          </Col>
          <Col>
            <Button
              danger
              icon={<ClearOutlined />}
              onClick={() => {
                formik.resetForm();
                formik.submitForm();
                onReset();
              }}
            >
              Clear filters
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};
