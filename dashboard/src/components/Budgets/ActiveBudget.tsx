import React, { FC, useState } from 'react';
import { useGetActiveBudgetQuery } from 'src/generated/graphql';
import { Collapse, Row, Col, Button, Modal, Select, Input, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAddOutcomeBudgetMutation } from '../../generated/graphql';
import CategoryIcon from 'src/components/misc/CategoryIcon';

const ActiveBudget: FC = () => {
  const { data } = useGetActiveBudgetQuery();
  const [addOutcomeBudget] = useAddOutcomeBudgetMutation();
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);

  return (
    <Row gutter={10}>
      <Col span={20}>
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header="incomes" key="1">
            incomes
          </Collapse.Panel>
          <Collapse.Panel header="outcomes" key="2">
            {data?.activeBudget.outcomes.map((budgetCategory) => (
              <Row id={budgetCategory.category.id}>
                <Col style={{ height: 200 }}>
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
      <Modal
        title="Add transaction"
        visible={modal}
        onCancel={() => setModal(false)}
        onOk={() => {
          addOutcomeBudget({
            variables: {
              categoryId: '822d7512-1643-4a05-8386-b0f6d0038cf9',
              amount: 5000,
              progress: 0,
            },
          });
          setModal(false);
        }}
      >
        <Select style={{ width: 300 }}>
          {data?.categories
            .filter((category) => category.type === 'outcome')
            .map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {t(category.name)}
              </Select.Option>
            ))}
        </Select>
        <Input type="number" placeholder="Input category limit for budget" />
      </Modal>
      <Col span={4}>
        <Button size="large">Add income category</Button>
        <Button size="large" onClick={() => setModal(true)}>
          Add outcome category
        </Button>
      </Col>
    </Row>
  );
};

export default ActiveBudget;
