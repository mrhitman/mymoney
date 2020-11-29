import { Col, Row } from 'antd';
import React, { FC } from 'react';
import LastTransactions from './LastTransactions';
import WalletsDinamic from './WalletsDinamic';

export const MainPage: FC = () => {
  return (
    <>
      <Row>
        <Col span={12}>
          <LastTransactions count={10} />
        </Col>
        <Col span={12}>
          <WalletsDinamic />
        </Col>
      </Row>
    </>
  );
};

export default MainPage;
