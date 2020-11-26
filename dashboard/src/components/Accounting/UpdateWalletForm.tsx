import { PlusOutlined } from '@ant-design/icons';
import { AutoComplete, Checkbox, Collapse, Form, Input, List, Tag } from 'antd';
import { FormikProps } from 'formik';
import React, { FC, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useGetCurrenciesQuery } from 'src/generated/graphql';
import { formLayout } from '../misc/Layout';
import { PocketItem } from './PocketItem';
import { UpdateWalletValues } from './types';

interface UpdateWalletFormProps {
  formik: FormikProps<UpdateWalletValues>;
}

const UpdateWalletForm: FC<UpdateWalletFormProps> = ({ formik }) => {
  const [currencyFilter, setCurrencyFilter] = useState('');
  const [addingTag, setAddingTag] = useState(false);
  const { data, loading } = useGetCurrenciesQuery();

  return (
    <Form {...formLayout} onSubmitCapture={formik.handleSubmit}>
      <Form.Item label="Name" name="name">
        <Input onChange={(e) => formik.setFieldValue('name', e.target.value)} />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea
          onChange={(e) => formik.setFieldValue('description', e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Tags" name="tags">
        {formik.values.tags.map((tag, i) => (
          <Tag key={`${tag}-${i}`} closable>
            <span>{tag}</span>
          </Tag>
        ))}
        {addingTag ? (
          <Input
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                formik.setFieldValue('tags', [
                  ...formik.values.tags,
                  (e.target as HTMLInputElement).value,
                ]);

                setAddingTag(false);
              }
            }}
          />
        ) : (
          <Tag className="site-tag-plus" onClick={() => setAddingTag(true)}>
            <PlusOutlined /> New Tag
          </Tag>
        )}
      </Form.Item>
      <Form.Item label="Pockets" name="pockets">
        <List
          itemLayout="horizontal"
          dataSource={formik.values.pockets}
          locale={{ emptyText: 'No pockets added yet' }}
          loading={loading}
          renderItem={(pocket) => (
            <PocketItem formik={formik} pocket={pocket} />
          )}
        />
        <AutoComplete
          value={currencyFilter}
          onSearch={(text) => setCurrencyFilter(text)}
          onSelect={(id) => {
            formik.setFieldValue('pockets', [
              ...formik.values.pockets,
              {
                currencyId: id,
                amount: undefined,
              },
            ]);
            setCurrencyFilter('');
          }}
          options={data?.currencies
            .filter(
              (c) =>
                !formik.values.pockets.map((p) => p.currencyId).includes(c.id),
            )
            .filter(
              (c) =>
                c.name.toLowerCase().includes(currencyFilter.toLowerCase()) ||
                c.description
                  ?.toLowerCase()
                  .includes(currencyFilter.toLowerCase()) ||
                c.symbol.toLowerCase().includes(currencyFilter.toLowerCase()),
            )
            .map((c) => ({
              value: c.id,
              label: (
                <div>
                  <span style={{ marginRight: 10 }}>
                    <ReactCountryFlag
                      className="emojiFlag"
                      countryCode={c.name.slice(0, 2)}
                    />
                  </span>
                  <span>{c.description} </span>
                  <span>({c.name})</span>
                </div>
              ),
            }))}
        >
          <Input.Search
            placeholder="Input here currency name or symbol or description"
            enterButton
          />
        </AutoComplete>
      </Form.Item>
      <Collapse accordion>
        <Collapse.Panel key="1" header="Options">
          <Form.Item
            label="Allow negative balance"
            name="allowNegativeBalance"
            labelCol={{ span: 22 }}
          >
            <Checkbox
              defaultChecked={formik.values.allowNegativeBalance}
              onChange={(e) =>
                formik.setFieldValue('allowNegativeBalance', e.target.checked)
              }
            />
          </Form.Item>
          <Form.Item
            label="Use in balance"
            name="useInBalance"
            labelCol={{ span: 22 }}
          >
            <Checkbox
              defaultChecked={formik.values.useInBalance}
              onChange={(e) =>
                formik.setFieldValue('useInBalance', e.target.checked)
              }
            />
          </Form.Item>
          <Form.Item
            label="Use in analytics"
            name="useInAnalytics"
            labelCol={{ span: 22 }}
          >
            <Checkbox
              defaultChecked={formik.values.useInAnalytics}
              onChange={(e) =>
                formik.setFieldValue('useInAnalytics', e.target.checked)
              }
            />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>
    </Form>
  );
};

export default UpdateWalletForm;
