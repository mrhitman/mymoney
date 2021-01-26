import { PlusCircleOutlined } from '@ant-design/icons';
import { Row, Card, Col } from 'antd';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface AddBudgetCategoryCardProps {
  onClick: () => void;
}

const AddBudgetCategoryCard: FC<AddBudgetCategoryCardProps> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <Col>
      <Card style={{ width: 250, height: 356 }} onClick={onClick}>
        <Card.Meta title="Add category" />
        <Row align="middle">
          <Col>
            <div style={{ margin: '60px 22px' }}>
              <PlusCircleOutlined style={{ fontSize: 150 }} />
            </div>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default AddBudgetCategoryCard;
