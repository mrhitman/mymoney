import { EditFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserCategory, useUpdateCategoryMutation } from 'src/generated/graphql';
import CategoryForm, { CategoryValues } from './CategoryForm';

export const EditCategory: FC<{ category: UserCategory }> = ({ category }) => {
  const [visible, setVisible] = useState(false);
  const [updateCategory] = useUpdateCategoryMutation();
  const { t } = useTranslation();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: category as any,
    onSubmit: (values: CategoryValues) => {
      updateCategory({
        variables: {
          data: {
            id: category.id,
            ...values,
          },
        },
      });
    },
  });

  return (
    <>
      <EditFilled onClick={() => setVisible(true)} />
      <Modal
        title={t('category_edit')}
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

export default EditCategory;
