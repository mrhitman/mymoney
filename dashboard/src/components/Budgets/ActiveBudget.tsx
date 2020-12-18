import { Button, Col, Collapse, Form, Input, Modal, Row, Select, Typography } from 'antd';
import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CategoryIcon from 'src/components/misc/CategoryIcon';
import {
  CategoryType,
  GetActiveBudgetQuery,
  useAddOutcomeBudgetMutation,
  useGetActiveBudgetQuery,
} from 'src/generated/graphql';

interface AddCategoryModalProps {
  visible: boolean;
  type: CategoryType;
  onOk: (values: { amount: number; categoryId: string }) => void;
  onCancel: () => void;
  categories: GetActiveBudgetQuery['categories'];
}

const AddCategoryModal: FC<AddCategoryModalProps> = ({
  visible,
  onOk,
  onCancel,
  categories,
  type,
}) => {
  const { t } = useTranslation();
  const formik = useFormik({
    onSubmit: onOk,
    initialValues: {
      amount: 0,
      categoryId: '',
    },
  });

  return (
    <Modal
      title="Add Category"
      visible={visible}
      onCancel={onCancel}
      onOk={() => formik.handleSubmit()}
    >
      <Form>
        <Select
          style={{ width: 300 }}
          value={formik.values.categoryId}
          onChange={(value) => formik.setFieldValue('categoryId', value)}
        >
          {categories
            .filter((category) => category.type === type)
            .map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {t(category.name)}
              </Select.Option>
            ))}
        </Select>
        <Input
          type="number"
          placeholder="Input category limit for budget"
          value={formik.values.amount}
          onChange={(e) => formik.setFieldValue('amount', +e.target.value)}
        />
      </Form>
    </Modal>
  );
};

const ActiveBudget: FC = () => {
  const { data } = useGetActiveBudgetQuery();
  const [addOutcomeBudget] = useAddOutcomeBudgetMutation();
  const { t } = useTranslation();
  const [type, setType] = useState<CategoryType | undefined>();

  return (
    <Row gutter={10}>
      <Col span={20}>
        <Collapse defaultActiveKey={['2']}>
          <Collapse.Panel header="incomes" key="1">
            incomes
          </Collapse.Panel>
          <Collapse.Panel header="outcomes" key="2">
            {data?.activeBudget.outcomes.map((budgetCategory) => (
              <Row id={budgetCategory.category.id}>
                <Col style={{ height: 140, width: 220, border: '1px solid gray', padding: 10 }}>
                  <Typography>Category: {t(budgetCategory.category.name)}</Typography>
                  <Typography>Amount: {budgetCategory.amount}</Typography>
                  <Typography>Progress: {budgetCategory.progress}</Typography>
                  <CategoryIcon icon={budgetCategory.category.icon} />
                </Col>
              </Row>
            ))}
          </Collapse.Panel>
          <Collapse.Panel header="savings" key="3">
            savings
          </Collapse.Panel>
        </Collapse>
      </Col>
      <AddCategoryModal
        visible={!!type}
        type={type!}
        onCancel={() => setType(undefined)}
        onOk={(values) => {
          addOutcomeBudget({
            variables: {
              categoryId: values.categoryId,
              amount: values.amount,
              progress: 0,
            },
          });
          setType(undefined);
        }}
        categories={data?.categories || []}
      />
      <Col span={4}>
        <Button size="large" onClick={() => setType(CategoryType.Income)}>
          Add income category
        </Button>
        <Button size="large" onClick={() => setType(CategoryType.Outcome)}>
          Add outcome category
        </Button>
      </Col>
    </Row>
  );
};

export default ActiveBudget;
