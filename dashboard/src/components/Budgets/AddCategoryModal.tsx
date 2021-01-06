import { Input, Form, Modal, Select } from 'antd';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryType, GetActiveBudgetQuery } from 'src/generated/graphql';

interface AddCategoryModalProps {
  visible: boolean;
  type: CategoryType;
  onOk: (values: { amount: number; categoryId: string }) => void;
  onCancel: () => void;
  categories: GetActiveBudgetQuery['categories'];
}

const AddCategoryModal: FC<AddCategoryModalProps> = ({
  visible,
  onOk,
  onCancel,
  categories,
  type,
}) => {
  const { t } = useTranslation();
  const formik = useFormik({
    onSubmit: onOk,
    initialValues: {
      amount: 0,
      progress: 0,
      categoryId: '',
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
        <Form.Item label="Category">
          <Select
            style={{ width: 300 }}
            value={formik.values.categoryId}
            onChange={(value) => formik.setFieldValue('categoryId', value)}
          >
            {categories
              .filter((category) => category.type === type)
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
            onChange={(e) => formik.setFieldValue('progress', +e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
