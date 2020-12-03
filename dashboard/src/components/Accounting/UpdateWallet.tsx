import { Modal } from 'antd';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { useUpdateWalletMutation, GetWalletsQuery } from 'src/generated/graphql';
import { UpdateWalletValues } from './types';
import UpdateWalletForm from './UpdateWalletForm';

export interface UpdateWalletProps {
  visible: boolean;
  wallet: GetWalletsQuery['wallets'][number];
  onClose: () => void;
}

export const UpdateWallet: FC<UpdateWalletProps> = ({ visible, onClose, wallet }) => {
  const [updateWallet] = useUpdateWalletMutation();
  const initialValues: UpdateWalletValues = {
    id: wallet.id,
    name: wallet.name,
    description: wallet.description || '',
    allowNegativeBalance: false,
    useInBalance: true,
    useInAnalytics: true,
    pockets: wallet.pockets.map((p) => ({ currencyId: p.currency.id, amount: p.amount })),
    tags: [],
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
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
        title="Update wallet"
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

export default UpdateWallet;
