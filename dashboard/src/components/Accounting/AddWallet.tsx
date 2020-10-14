import { Modal } from "antd";
import { useFormik } from "formik";
import React, { FC } from "react";
import AddWalletForm from "./AddWalletForm";
import { AddWalletValues } from "./types";

export const initialValues: AddWalletValues = {
  name: "",
  description: "",
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
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
      formik.setSubmitting(false);
      formik.resetForm();
      onClose();
    },
  });

  return (
    <div>
      <Modal
        title="Add new wallet"
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
