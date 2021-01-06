import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Card, Col, Collapse, Row, Typography } from 'antd';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CategoryIcon from 'src/components/misc/CategoryIcon';
import {
  CategoryType,
  useAddOutcomeBudgetMutation,
  useGetActiveBudgetQuery,
} from 'src/generated/graphql';
import AddCategoryModal from './AddCategoryModal';

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
            <Row gutter={[16, 16]}>
              {data?.activeBudget.outcomes.map((budgetCategory) => (
                <Col id={budgetCategory.category.id}>
                  <Card
                    actions={[
                      <DeleteOutlined key="delete" />,
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
