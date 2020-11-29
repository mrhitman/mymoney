import { Col, Row } from 'antd';
import React, { FC } from 'react';
import LastTransactions from './LastTransactions';
import WalletsDinamic from './WalletsDinamic';
import CategoriesDinamic from './CategoriesDinamic';

export const MainPage: FC = () => {
  return (
    <>
      <Row gutter={20}>
        <Col span={12}>
          <LastTransactions count={10} />
        </Col>
        <Col span={12}>
          <Row gutter={20}>
            <WalletsDinamic />
          </Row>
          <Row gutter={20}>
            <CategoriesDinamic />
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default MainPage;
