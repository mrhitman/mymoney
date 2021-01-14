import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CategoryForm from './CategoryForm';

export const AddCategory: FC = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {},
    onSubmit: console.log,
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
