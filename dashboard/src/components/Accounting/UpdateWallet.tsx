import { Modal } from 'antd';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { useUpdateWalletMutation } from 'src/generated/graphql';
import AddWalletForm from './AddWalletForm';
import { UpdateWalletValues } from './types';

const initialValues: UpdateWalletValues = {
  id: '',
  name: '',
  description: '',
  allowNegativeBalance: true,
  useInBalance: true,
  useInAnalytics: true,
  pockets: [],
  tags: [],
};

export interface UpdateWalletProps {
  visible: boolean;
  onClose: () => void;
}

export const AddWallet: FC<UpdateWalletProps> = ({ visible, onClose }) => {
  const [updateWallet] = useUpdateWalletMutation();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      console.log(values);
      await updateWallet({
        variables: {
          walletUpdateData: {
            id: values.id,
            name: values.name,
            description: values.description,
            allowNegativeBalance: values.allowNegativeBalance,
            pockets: values.pockets,
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
        title="Update new wallet"
        width={720}
        visible={visible}
        onOk={() => formik.handleSubmit()}
        onCancel={(e) => {
          e.stopPropagation();
          formik.resetForm();
          onClose();
        }}
      >
        <UpdateWalletForm formik={formik} />
      </Modal>
    </div>
  );
};

export default AddWallet;
