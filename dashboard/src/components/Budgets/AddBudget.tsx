import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
import BudgetForm from './BudgetForm';
import moment from 'moment';

interface BudgetCategory {
  categoryId: string;
  amount: number;
  progress: number;
}
interface BudgetFormValues {
  date: Date;
  deadline: Date;
  currencyId: string;
  incomes: BudgetCategory[];
  outcomes: BudgetCategory[];
}

const initialValues: BudgetFormValues = {
  date: moment().startOf('month').toDate(),
  deadline: moment().startOf('month').toDate(),
  currencyId: '',
  incomes: [],
  outcomes: [],
};

export const AddBudget: FC<{}> = (props) => {
  const [visible, setVisible] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {},
    onSubmit: console.log,
  });

  return (
    <>
      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        size="large"
        onClick={() => setVisible(true)}
      >
        Create budget
      </Button>
      <Modal
        visible={visible}
        title="Create budget"
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

export default AddBudget;
