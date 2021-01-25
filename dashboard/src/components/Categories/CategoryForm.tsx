import { Cascader, Col, Form, Input, Popover, Row, Select, Tag } from 'antd';
import { last, omit } from 'lodash';
import React, { FC, useState } from 'react';
import { SketchPicker } from 'react-color';
import { useTranslation } from 'react-i18next';
import { useGetBaseCategoriesQuery } from 'src/generated/graphql';
import { CategoryIcon } from '../misc/CategoryIcon';

export interface CategoryValues {
  id?: string;
  name: string;
  description?: string;
  categoryId: string;
  parent?: string;
  icon?: {
    name?: string;
    type?: string;
    color?: string;
    backgroundColor?: string;
  };
  codes?: number[];
  isFixed?: boolean;
}

interface CategoryFormProps {
  formik: any;
}

export const CategoryForm: FC<CategoryFormProps> = ({ formik }) => {
  const { data, loading } = useGetBaseCategoriesQuery();
  const [addCode, setAddCode] = useState(false);
  const [code, setCode] = useState<number>();
  const { t } = useTranslation();
  const handleAddCode = () => {
    formik.setFieldValue('codes', [...formik.values.codes, code]);
    setCode(undefined);
    setAddCode(false);
  };
  return (
    <Form labelCol={{ span: 8 }}>
      {!formik.values.id && (
        <Form.Item label="Base category">
          <Cascader
            onChange={(values) => {
              const value = last(values);
              formik.setFieldValue('categoryId', value);
              const category = data?.baseCategories.find((c) => c.id === value);

              if (category) {
                formik.setFieldValue('name', category.name);
                formik.setFieldValue('description', category.description);
                formik.setFieldValue('icon', omit(category.icon, ['__typename']));
                formik.setFieldValue('codes', category.codes);
              }
            }}
            options={[
              {
                value: 'outcome',
                label: 'Outcome',
                loading,
                children: data?.baseCategories
                  .filter((c) => c.type === 'outcome')
                  .map((c) => ({
                    value: c.id,
                    label: t(c.name),
                  })),
              },
              {
                value: 'income',
                label: 'Income',
                loading,
                children: data?.baseCategories
                  .filter((c) => c.type === 'income')
                  .map((c) => ({
                    value: c.id,
                    label: t(c.name),
                  })),
              },
            ]}
          />
        </Form.Item>
      )}
      <Form.Item label="Name">
        <Input
          value={formik.values.name}
          onChange={(e) => formik.setFieldValue('name', e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Description">
        <Input
          value={formik.values.description}
          onChange={(e) => formik.setFieldValue('description', e.target.value)}
        />
      </Form.Item>
      <Form.Item label="MCC Codes">
        {formik.values.codes?.map((code: number) => (
          <Tag
            key={code}
            closable
            color="volcano"
            onClose={() =>
              formik.setFieldValue(
                'codes',
                formik.values.codes.filter((c: number) => c !== code),
              )
            }
          >
            {code}
          </Tag>
        ))}
        {addCode ? (
          <Input
            type="text"
            size="small"
            className="tag-input"
            onChange={(e) => setCode(+e.target.value)}
            onBlur={handleAddCode}
            onPressEnter={handleAddCode}
          />
        ) : (
          <Tag color="volcano" onClick={() => setAddCode(!addCode)}>
            Add code
          </Tag>
        )}
      </Form.Item>
      <Form.Item label="Icon type">
        <Select
          value={formik.values.icon?.type}
          onChange={(value) => formik.setFieldValue('icon.type', value)}
        >
          <Select.Option value="AntDesign">AntDesign</Select.Option>
          <Select.Option value="FontAwesome">FontAwesome</Select.Option>
          <Select.Option value="FontAwesome5">FontAwesome5</Select.Option>
          <Select.Option value="Fontisto">Fontisto</Select.Option>
          <Select.Option value="Feather">Feather</Select.Option>
          <Select.Option value="MaterialCommunityIcons">MaterialCommunityIcons</Select.Option>
          <Select.Option value="Entypo">Entypo</Select.Option>
          <Select.Option value="Ionicons">Ionicons</Select.Option>
          <Select.Option value="Octicons">Octicons</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Icon name">
        <Input
          value={formik.values.icon?.name}
          onChange={(e) => formik.setFieldValue('icon.name', e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Icon color">
        <Popover
          placement="rightTop"
          content={
            <SketchPicker
              color={formik.values.icon?.color || 'white'}
              onChange={(c) => formik.setFieldValue('icon.color', c.hex)}
            />
          }
          trigger="click"
        >
          <Input
            value={formik.values.icon?.color}
            readOnly
            suffix={
              <div
                style={{
                  width: 28,
                  height: 28,
                  border: '1px solid grey',
                  backgroundColor: formik.values.icon?.color,
                }}
              />
            }
          />
        </Popover>
      </Form.Item>
      <Form.Item label="Icon background">
        <Popover
          placement="rightTop"
          content={
            <SketchPicker
              color={formik.values.icon?.backgroundColor || 'white'}
              onChange={(c) => formik.setFieldValue('icon.backgroundColor', c.hex)}
            />
          }
          trigger="click"
        >
          <Input
            value={formik.values.icon?.backgroundColor}
            readOnly
            suffix={
              <div
                style={{
                  width: 28,
                  height: 28,
                  border: '1px solid grey',
                  backgroundColor: formik.values.icon?.backgroundColor,
                }}
              />
            }
          />
        </Popover>
      </Form.Item>
      <Row>
        <Col>
          <CategoryIcon icon={formik.values.icon} />
        </Col>
      </Row>
    </Form>
  );
};

export default CategoryForm;
