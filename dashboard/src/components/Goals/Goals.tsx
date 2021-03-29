import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Col,
  List,
  Popconfirm,
  Row,
  Skeleton,
  Progress,
} from 'antd';
import { pick } from 'lodash';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useDeleteGoalMutation, useGetGoalsQuery } from 'src/generated/graphql';
import { AddGoal } from './AddGoal';
import { UpdateGoal } from './UpdateGoal';

export const Goals: FC = () => {
  const { t } = useTranslation();
  const { data: goals, loading, refetch } = useGetGoalsQuery();
  const [deleteGoal] = useDeleteGoalMutation();

  return (
    <>
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>
          <Link to="/">{t('home')}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t('goals')}</Breadcrumb.Item>
      </Breadcrumb>
      <Skeleton loading={loading}>
        <Row gutter={16}>
          <Col span={12}>
            <List
              itemLayout="horizontal"
              dataSource={goals?.goals}
              renderItem={(goal) => (
                <List.Item
                  actions={[
                    <Button icon={<SaveOutlined />} key="save">
                      Save to goal
                    </Button>,
                    <Popconfirm
                      key="delete"
                      title="Are you sure to delete this goal?"
                      onConfirm={async (e) => {
                        await deleteGoal({ variables: { id: goal.id } });
                        refetch();
                        e?.preventDefault();
                      }}
                      okText="Yes, I want"
                      cancelText="No"
                    >
                      <Button icon={<DeleteOutlined />} key="delete">
                        Remove
                      </Button>
                    </Popconfirm>,
                    <UpdateGoal
                      key="update"
                      initialValues={pick(goal, [
                        'id',
                        'name',
                        'goal',
                        'progress',
                        'currencyId',
                      ])}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    title={goal.name}
                    description={`To collect ${goal.goal} ${goal.currency.symbol}`}
                  />
                  <Progress
                    size="small"
                    type="circle"
                    percent={(goal.progress / goal.goal) * 100}
                  />
                </List.Item>
              )}
            />
            <AddGoal onAdd={() => refetch()} />
          </Col>
        </Row>
      </Skeleton>
    </>
  );
};
