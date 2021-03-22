import { Modal } from 'antd';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { useAddWalletMutation } from 'src/generated/graphql';
import { useTranslation } from 'react-i18next';
import AddWalletForm from './AddWalletForm';
import { AddWalletValues } from './types';

export const initialValues: AddWalletValues = {
  name: '',
  description: '',
  allowNegativeBalance: true,
  useInBalance: true,
  useInAnalytics: true,
  pockets: [],
  tags: [],
};

export interface AddWalletProps {
  visible: boolean;
  onClose: () => void;
}

export const AddWallet: FC<AddWalletProps> = ({ visible, onClose }) => {
  const [addWallet] = useAddWalletMutation();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      await addWallet({
        variables: {
          walletCreateData: {
            name: values.name,
            description: values.description,
            pockets: values.pockets,
            tags: values.tags,
          },
        },
      });
      formik.setSubmitting(false);
      formik.resetForm();
      onClose();
    },
  });

  return (
    <div>
      <Modal
        title={t('add_wallet')}
        width={720}
        visible={visible}
        onOk={() => formik.handleSubmit()}
        onCancel={(e) => {
          e.stopPropagation();
          formik.resetForm();
          onClose();
        }}
      >
        <AddWalletForm formik={formik} />
      </Modal>
    </div>
  );
};

export default AddWallet;
