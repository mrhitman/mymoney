import { Modal, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import React, { FC, useState } from 'react';
import BudgetForm from './BudgetForm';
import { useFormik } from 'formik';
import { useUpdateBudgetMutation } from 'src/generated/graphql';

export interface UpdateBudgetProps {
  initialValues: {
    id: string;
    date: Date;
    deadline: Date;
  };
}

export const UpdateBudget: FC<UpdateBudgetProps> = (props) => {
  const [visible, setVisible] = useState(false);
  const [updateBudget] = useUpdateBudgetMutation();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: props.initialValues,
    onSubmit: (values) => {
      updateBudget({
        variables: {
          data: values,
        },
      });
    },
  });

  return (
    <>
      <Button
        icon={<EditOutlined />}
        size="large"
        style={{ width: 200 }}
        onClick={() => setVisible(true)}
      >
        Update budget
      </Button>
      <Modal
        visible={visible}
        title="Update budget"
        onCancel={() => setVisible(false)}
        onOk={() => {
          setVisible(false);
          formik.handleSubmit();
        }}
      >
        <BudgetForm formik={formik} />
      </Modal>
    </>
  );
};
