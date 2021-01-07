import { Button, Col, Collapse, Row } from 'antd';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CategoryType,
  useAddIncomeBudgetMutation,
  useAddOutcomeBudgetMutation,
  useGetActiveBudgetQuery,
} from 'src/generated/graphql';
import AddCategoryModal, { AddCategoryValues } from './AddCategoryModal';
import BudgetCategory from './BudgetCategory';

const ActiveBudget: FC = () => {
  const { data } = useGetActiveBudgetQuery();
  const [addOutcomeBudget] = useAddOutcomeBudgetMutation();
  const [addIncomeBudget] = useAddIncomeBudgetMutation();
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  function addBudgetCategory(values: AddCategoryValues) {
    switch (values.type) {
      case CategoryType.Outcome:
        return addOutcomeBudget({ variables: values });
      case CategoryType.Income:
        return addIncomeBudget({ variables: values });
    }
  }

  return (
    <Row gutter={10}>
      <Col span={20}>
        <Collapse defaultActiveKey={['1', '2']}>
          <Collapse.Panel header="incomes" key="1">
            <Row gutter={[16, 16]}>
              {data?.activeBudget.incomes.map((budgetCategory) => (
                <BudgetCategory budgetCategory={budgetCategory} />
              ))}
            </Row>
          </Collapse.Panel>
          <Collapse.Panel header="outcomes" key="2">
            <Row gutter={[16, 16]}>
              {data?.activeBudget.outcomes.map((budgetCategory) => (
                <BudgetCategory budgetCategory={budgetCategory} />
              ))}
            </Row>
          </Collapse.Panel>
          <Collapse.Panel header="savings" key="3">
            savings
          </Collapse.Panel>
        </Collapse>
      </Col>
      <AddCategoryModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={(values) => {
          addBudgetCategory({
            categoryId: values.categoryId,
            amount: values.amount,
            progress: values.progress,
            type: values.type,
          });
          setVisible(false);
        }}
        categories={data?.categories || []}
      />
      <Col span={4}>
        <Button size="large" onClick={() => setVisible(true)}>
          Add category
        </Button>
      </Col>
    </Row>
  );
};

export default ActiveBudget;
