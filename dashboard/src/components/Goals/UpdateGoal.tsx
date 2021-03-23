import { EditFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GoalForm } from './GoalForm';
import { UpdateGoalValues } from './types';
import { useUpdateGoalMutation } from '../../generated/graphql';

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
    onSubmit: async (values: any) => {
      await updateGoal({
        variables: {
          goalUpdateData: {
            id: values.id,
            name: values.name,
            goal: values.goal,
          },
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
        {t('goal_update')}
      </Button>
      <Modal
        title={t('goal_update')}
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
