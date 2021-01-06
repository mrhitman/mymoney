import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Card, Col, Collapse, Popconfirm, Row, Typography } from 'antd';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CategoryIcon from 'src/components/misc/CategoryIcon';
import {
  CategoryType,
  GetActiveBudgetQuery,
  useAddIncomeBudgetMutation,
  useAddOutcomeBudgetMutation,
  useGetActiveBudgetQuery,
  useRemoveIncomeBudgetMutation,
  useRemoveOutcomeBudgetMutation,
} from 'src/generated/graphql';
import AddCategoryModal from './AddCategoryModal';

const BudgetCategory: FC<{
  budgetCategory:
    | GetActiveBudgetQuery['activeBudget']['outcomes'][number]
    | GetActiveBudgetQuery['activeBudget']['incomes'][number];
}> = (props) => {
  const { t } = useTranslation();
  const [removeOutcomeBudget] = useRemoveOutcomeBudgetMutation();
  const [removeIncomeBudget] = useRemoveIncomeBudgetMutation();

  function removeBudgetCategory(categoryId: string, type: CategoryType | null | undefined) {
    switch (type) {
      case CategoryType.Outcome:
        return removeOutcomeBudget({ variables: { categoryId } });
      case CategoryType.Income:
        return removeIncomeBudget({ variables: { categoryId } });
    }
  }
  const { budgetCategory } = props;
  return (
    <Col id={budgetCategory.category.id}>
      <Card
        actions={[
          <Popconfirm
            title={`Are you sure to delete this budget category?`}
            onConfirm={(e) => {
              removeBudgetCategory(budgetCategory.category.id, budgetCategory.category.type);
              e?.preventDefault();
            }}
            okText="Yes, I want"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined key="delete" />} />
          </Popconfirm>,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Card.Meta
          title={t(budgetCategory.category.name)}
          avatar={<CategoryIcon icon={budgetCategory.category.icon} />}
        ></Card.Meta>
        <Row>
          <Typography>Amount: {budgetCategory.amount}</Typography>
          <Typography>Progress: {budgetCategory.progress}</Typography>
        </Row>
      </Card>
    </Col>
  );
};

const ActiveBudget: FC = () => {
  const { data } = useGetActiveBudgetQuery();
  const [addOutcomeBudget] = useAddOutcomeBudgetMutation();
  const [addIncomeBudget] = useAddIncomeBudgetMutation();
  const { t } = useTranslation();
  const [type, setType] = useState<CategoryType | undefined>();

  function addBudgetCategory(values: { categoryId: string; amount: number; progress: number }) {
    switch (type) {
      case CategoryType.Outcome:
        return addOutcomeBudget({ variables: values });
      case CategoryType.Income:
        return addIncomeBudget({ variables: values });
    }
  }

  return (
    <Row gutter={10}>
      <Col span={20}>
        <Collapse defaultActiveKey={['2']}>
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
        visible={!!type}
        type={type!}
        onCancel={() => setType(undefined)}
        onOk={(values) => {
          addBudgetCategory({
            categoryId: values.categoryId,
            amount: values.amount,
            progress: 0,
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
