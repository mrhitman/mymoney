import {
  AreaChartOutlined,
  ArrowsAltOutlined,
  BarChartOutlined,
  BookOutlined,
  CarryOutOutlined,
  DollarOutlined,
  FallOutlined,
  LaptopOutlined,
  LinkOutlined,
  LogoutOutlined,
  MenuOutlined,
  MoneyCollectOutlined,
  PieChartOutlined,
  RiseOutlined,
  ScheduleOutlined,
  SolutionOutlined,
  TableOutlined,
  TrophyOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout as AntdLayout, Menu } from 'antd';
import React, { FC, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { ActivePage } from './Header';

export const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface LayoutProps {
  activePage?: ActivePage;
}

const MenuMap: Record<string, string> = {
  'accounting': 'ledgers',
  'incomes': 'transactions',
  'outcomes': 'transactions'
};

const Layout: FC<LayoutProps> = ({ activePage, children }) => {
  const [redirect, setRedirect] = useState<string | undefined>(undefined);

  if (redirect) {
    return <Redirect to={redirect} exact />;
  }

  if (!localStorage.getItem('accessToken')) {
    return <Redirect to="/login" exact />;
  }

  const logout = () => {
    localStorage.clear();
    setRedirect('/login');
  };

  const navigate = (page: ActivePage) => () => {
    setRedirect(page ? `/${page}` : '/');
  };

  return (
    <AntdLayout>
      <AntdLayout.Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" style={{ float: 'right' }}>
          <Menu.SubMenu key="1" icon={<MenuOutlined />}>
            <Menu.Item key="2" icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </AntdLayout.Header>
      <AntdLayout>
        <AntdLayout.Sider width={280} className="site-layout-background">
          <Menu
            theme="dark"
            mode="inline"
            defaultOpenKeys={activePage ? [MenuMap[activePage]] : []}
            selectedKeys={activePage ? [activePage] : activePage}
            style={{ height: '100vh', borderRight: 0 }}
          >
            <Menu.SubMenu key="ledgers" icon={<DollarOutlined />} title="Ledgers">
              <Menu.Item
                key="accounting"
                icon={<WalletOutlined />}
                onClick={navigate('accounting')}
              >
                Wallets
              </Menu.Item>
              <Menu.Item key="2" icon={<TrophyOutlined />}>
                Goals
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="transactions"
              icon={<LaptopOutlined />}
              title="Transactions"
            >
              <Menu.Item
                key="incomes"
                onClick={navigate('incomes')}
                icon={<RiseOutlined />}
              >
                Incomes
              </Menu.Item>
              <Menu.Item
                key="outcomes"
                onClick={navigate('outcomes')}
                icon={<FallOutlined />}
              >
                Outcomes
              </Menu.Item>
              <Menu.Item key="7" icon={<ArrowsAltOutlined />}>
                Transfers
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="sub3" icon={<TableOutlined />} title="Budget">
              <Menu.Item key="9" icon={<CarryOutOutlined />}>
                Current
              </Menu.Item>
              <Menu.Item key="10" icon={<ScheduleOutlined />}>
                Planning
              </Menu.Item>
              <Menu.Item key="11" icon={<SolutionOutlined />}>
                Archive
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sub4"
              icon={<AreaChartOutlined />}
              title="Statistics"
            >
              <Menu.Item key="15" icon={<PieChartOutlined />}>
                By Categories
              </Menu.Item>
              <Menu.Item key="16" icon={<PieChartOutlined />}>
                By Currencies
              </Menu.Item>
              <Menu.Item key="17" icon={<BarChartOutlined />}>
                By Period
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="12" icon={<BookOutlined />}>
              Categories
            </Menu.Item>
            <Menu.Item key="13" icon={<MoneyCollectOutlined />}>
              Currencies
            </Menu.Item>
            <Menu.Item key="14" icon={<LinkOutlined />}>
              Connectors
            </Menu.Item>
          </Menu>
        </AntdLayout.Sider>
        <AntdLayout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <AntdLayout.Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </AntdLayout.Content>
        </AntdLayout>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;
