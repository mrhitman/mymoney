import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAddGoalMutation } from 'src/generated/graphql';
import { GoalForm } from './GoalForm';
import { AddGoalValues } from './types';

const initialValues: AddGoalValues = {
  name: '',
  goal: 0,
  progress: 0,
  currencyId: '',
};

interface AddGoalProps {
  onAdd: () => void;
}

export const AddGoal: FC<AddGoalProps> = ({ onAdd }) => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const [createGoal] = useAddGoalMutation();

  const formik = useFormik<AddGoalValues>({
    enableReinitialize: true,
    initialValues,
    onSubmit: async (values) => {
      await createGoal({
        variables: {
          goalCreateData: { ...values },
        },
      });
      onAdd();
      formik.resetForm();
    },
  });

  return (
    <>
      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={() => setVisible(true)}
      >
        {t('goal_add')}
      </Button>
      <Modal
        title={t('goal_add')}
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
        <GoalForm formik={formik} />
      </Modal>
    </>
  );
};
