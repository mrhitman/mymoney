import { EditFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUpdateGoalMutation } from 'src/generated/graphql';
import { GoalForm } from './GoalForm';
import { UpdateGoalValues } from './types';

interface UpdateGoalProps {
  initialValues: UpdateGoalValues;
}

export const UpdateGoal: FC<UpdateGoalProps> = ({ initialValues }) => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const [updateGoal] = useUpdateGoalMutation();

  const formik = useFormik<UpdateGoalValues>({
    enableReinitialize: true,
    initialValues,
    onSubmit: async (values) => {
      await updateGoal({
        variables: {
          goalUpdateData: values,
        },
      });
      formik.resetForm();
    },
  });

  return (
    <>
      <Button
        type="primary"
        icon={<EditFilled />}
        onClick={() => setVisible(true)}
      >
        {t('goal_edit')}
      </Button>
      <Modal
        title={t('goal_edit')}
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
