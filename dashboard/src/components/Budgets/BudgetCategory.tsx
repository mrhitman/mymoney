import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Card, Col, Popconfirm, Row, Typography } from 'antd';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import CategoryIcon from 'src/components/misc/CategoryIcon';
import {
  CategoryType,
  GetActiveBudgetQuery,
  useRemoveIncomeBudgetMutation,
  useRemoveOutcomeBudgetMutation,
} from 'src/generated/graphql';

interface BudgetCategoryProps {
  budgetCategory:
    | GetActiveBudgetQuery['activeBudget']['outcomes'][number]
    | GetActiveBudgetQuery['activeBudget']['incomes'][number];
}

const BudgetCategory: FC<BudgetCategoryProps> = ({ budgetCategory }) => {
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

export default BudgetCategory;
