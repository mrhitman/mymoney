import { Col, Layout as AntdLayout, Row } from 'antd';
import React, { FC, useState } from 'react';
import { Redirect } from 'react-router-dom';
// import Rates from '../Rates/Rates';
// import AddTransaction from '../Transactions/AddTransaction';
// import AddWallet from '../Wallets/AddWallet';
// import Wallets from '../Wallets/Wallets';
import MenuHeader, { ActivePage } from './Header';

export const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface LayoutProps {
  activePage?: ActivePage;
}

interface LayoutState {
  redirect?: string;
}

const Layout: FC<LayoutProps> = ({ activePage, children }) => {

  const [redirect, setRedirect] = useState<string | undefined>(undefined);
  if (redirect) {
    return <Redirect to={redirect} exact />;
  }

  // if (!this.store.isAuthorized) {
  // return <Redirect to="/login" exact />;
  // }

  const logout = async () => {
    try {
      // await this.store.logout();
    } finally {
      setRedirect('/login');
    }
  };

  const navigate = async (page: ActivePage) => {
    setRedirect(page ? `/${page}` : '/');
  };

  return (
    <AntdLayout>
      <AntdLayout.Sider collapsible width={180} />
      <AntdLayout>
        <AntdLayout.Header>
          <div className="logo" />
          <MenuHeader
            activePage={activePage}
            handleLogout={logout}
            handleNavigate={navigate}
          />
        </AntdLayout.Header>
        <AntdLayout.Content>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              {/* <AddTransaction />
                <AddWallet />
                <Wallets />
                <Rates /> */}
            </Col>
            <Col span={17}>{children}</Col>
            <Col />
          </Row>
        </AntdLayout.Content>
        <AntdLayout.Footer />
      </AntdLayout>
    </AntdLayout>
  );
}

export default Layout;
