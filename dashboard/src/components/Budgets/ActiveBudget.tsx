import { Col, Divider, Row, Statistic, Typography } from 'antd';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CategoryType,
  useAddIncomeBudgetMutation,
  useAddOutcomeBudgetMutation,
  useGetActiveBudgetQuery,
} from 'src/generated/graphql';
import AddBudget from './AddBudget';
import AddBudgetCategoryCard from './AddBudgetCategoryCard';
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

  if (!data?.activeBudget) {
    return (
      <Row>
        <Col span={20}>
          <div>No active budget </div>
        </Col>
        <Col>
          <AddBudget />
        </Col>
      </Row>
    );
  }

  const incomes = data?.activeBudget.incomes.reduce((acc, v) => v.progress + acc, 0) || 0;
  const outcomes = data?.activeBudget.outcomes.reduce((acc, v) => v.progress + acc, 0) || 0;
  const available = incomes - outcomes;
  return (
    <Row gutter={10}>
      <Col>
        <Typography.Title level={2}>Active budget</Typography.Title>
        <Divider />
        <Row gutter={[20, 20]}>
          <Col>
            <Statistic title="Start date" value={moment(data?.activeBudget.date).format('L')} />
          </Col>
          <Col>
            <Statistic title="End date" value={moment(data?.activeBudget.deadline).format('L')} />
          </Col>
          <Col>
            <Statistic
              title="Budget available"
              value={available}
              valueStyle={{ color: available < 0 ? '#b71c1c' : '#43a047' }}
              precision={2}
              prefix={'₴'}
              suffix={'UAH'}
            />
          </Col>
          {/* <Col offset={18}>
            <Button
              size="large"
              style={{ width: 200 }}
              icon={<PlusCircleOutlined />}
              onClick={() => setVisible(true)}
            >
              Add category
            </Button>
            <UpdateBudget
              initialValues={{
                id: data?.activeBudget.id!,
                date: data?.activeBudget.date,
                deadline: data?.activeBudget.deadline,
              }}
            />
          </Col> */}
        </Row>
        <Divider />
        <Typography.Title level={3}>Income categories</Typography.Title>
        <Row gutter={[16, 16]}>
          {data?.activeBudget.incomes.map((budgetCategory) => (
            <BudgetCategory budgetCategory={budgetCategory} />
          ))}
          <AddBudgetCategoryCard onClick={() => setVisible(true)} />
        </Row>
        <Typography.Title level={3}>Outcome categories</Typography.Title>
        <Row gutter={[16, 16]}>
          {data?.activeBudget.outcomes.map((budgetCategory) => (
            <BudgetCategory budgetCategory={budgetCategory} />
          ))}
          <AddBudgetCategoryCard onClick={() => setVisible(true)} />
        </Row>
      </Col>
      <AddCategoryModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={(values) => {
          addBudgetCategory(values);
          setVisible(false);
        }}
        categories={data?.categories || []}
      />
    </Row>
  );
};

export default ActiveBudget;
