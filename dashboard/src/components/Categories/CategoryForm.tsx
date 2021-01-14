import { Form, Input, Popover, Select } from 'antd';
import React, { FC } from 'react';
import { SketchPicker } from 'react-color';
import { useTranslation } from 'react-i18next';
import { useGetBaseCategoriesQuery } from 'src/generated/graphql';

export interface CategoryValues {
  name: string;
  description: string;
  categoryId: string;
  parent: string;
  icon: {
    name: string;
    type: string;
    color: string;
    backgroundColor: string;
  };
  isFixed: boolean;
}

interface CategoryFormProps {
  formik: any;
}

export const CategoryForm: FC<CategoryFormProps> = ({ formik }) => {
  const { data, loading } = useGetBaseCategoriesQuery();
  const { t } = useTranslation();

  return (
    <Form labelCol={{ span: 8 }}>
      <Form.Item label="Base category">
        <Select
          loading={loading}
          onChange={(e) => {
            formik.setFieldValue('categoryId', e);
            const category = data?.baseCategories.find((c) => c.id === e);
            if (category) {
              formik.setFieldValue('name', formik.values.name || category.name);
              formik.setFieldValue(
                'description',
                formik.values.description || category.description,
              );
              formik.setFieldValue('icon', formik.values.icon || category.icon);
            }
          }}
        >
          {data?.baseCategories.map((bc) => (
            <Select.Option key={bc.id} value={bc.id}>
              {t(bc.name)}/{bc.type}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
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
      <Form.Item label="Icon type">
        <Input
          value={formik.values.icon?.type}
          onChange={(e) => formik.setFieldValue('icon.type', e.target.value)}
        />
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
              color={formik.values.icon?.color}
              onChange={(c) => formik.setFieldValue('icon.color', c.hex)}
            />
          }
          trigger="click"
        >
          <Input value={formik.values.icon?.color} readOnly />
        </Popover>
      </Form.Item>
      <Form.Item label="Icon background">
        <Popover
          placement="rightTop"
          content={
            <SketchPicker
              color={formik.values.icon?.backgroundColor}
              onChange={(c) => formik.setFieldValue('icon.backgroundColor', c.hex)}
            />
          }
          trigger="click"
        >
          <Input value={formik.values.icon?.backgroundColor} readOnly />
        </Popover>
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;
