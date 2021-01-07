import { Input, Form, Modal, Select, Checkbox } from 'antd';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryType, GetActiveBudgetQuery } from 'src/generated/graphql';

export interface AddCategoryValues {
  categoryId: string;
  type: CategoryType;
  amount: number;
  progress: number;
  recalculateProgress: boolean;
}

interface AddCategoryModalProps {
  visible: boolean;
  onOk: (values: AddCategoryValues) => void;
  onCancel: () => void;
  categories: GetActiveBudgetQuery['categories'];
}

const AddCategoryModal: FC<AddCategoryModalProps> = ({ visible, onOk, onCancel, categories }) => {
  const { t } = useTranslation();
  const formik = useFormik({
    onSubmit: onOk,
    initialValues: {
      type: CategoryType.Outcome,
      amount: 0,
      progress: 0,
      categoryId: '',
      recalculateProgress: false,
    },
  });

  return (
    <Modal
      title="Add Category"
      visible={visible}
      onCancel={onCancel}
      onOk={() => formik.handleSubmit()}
    >
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Form.Item label="Type">
          <Select
            style={{ width: 300 }}
            value={formik.values.type}
            onChange={(value) => formik.setFieldValue('type', value)}
          >
            <Select.Option key={CategoryType.Income} value={CategoryType.Income}>
              {CategoryType.Income}
            </Select.Option>
            <Select.Option key={CategoryType.Outcome} value={CategoryType.Outcome}>
              {CategoryType.Outcome}
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Category">
          <Select
            style={{ width: 300 }}
            value={formik.values.categoryId}
            onChange={(value) => formik.setFieldValue('categoryId', value)}
          >
            {categories
              .filter((category) => category.type === formik.values.type)
              .map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {t(category.name)}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="Limit for category">
          <Input
            type="number"
            placeholder="Input category limit for budget"
            value={formik.values.amount}
            onChange={(e) => formik.setFieldValue('amount', +e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Set progress">
          <Input
            type="number"
            value={formik.values.progress}
            readOnly={formik.values.recalculateProgress}
            onChange={(e) => formik.setFieldValue('progress', +e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Recalculate progress">
          <Checkbox
            value={formik.values.recalculateProgress}
            onChange={(e) => formik.setFieldValue('recalculateProgress', e.target.checked)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
