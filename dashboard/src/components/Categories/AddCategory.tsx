import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CategoryForm from './CategoryForm';
import { useAddCategoryMutation } from 'src/generated/graphql';
import { CategoryValues } from './CategoryForm';
import { omit } from 'lodash';

const initialValues: CategoryValues = {
  name: '',
  categoryId: '',
};

export const AddCategory: FC = () => {
  const [visible, setVisible] = useState(false);
  const [addCategory] = useAddCategoryMutation();
  const { t } = useTranslation();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: (values: CategoryValues) => {
      addCategory({
        variables: {
          data: {
            ...omit(values, 'categoryId'),
            baseCategoryId: values.categoryId,
          },
        },
      });
    },
  });

  return (
    <>
      <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setVisible(true)}>
        {t('category_add')}
      </Button>
      <Modal
        title={t('category_add')}
        visible={visible}
        onOk={() => {
          setVisible(false);
          formik.handleSubmit();
        }}
        onCancel={() => {
          setVisible(false);
          formik.resetForm();
        }}
      >
        <CategoryForm formik={formik} />
      </Modal>
    </>
  );
};

export default AddCategory;
