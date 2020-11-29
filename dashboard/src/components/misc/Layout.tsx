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
  MoneyCollectOutlined,
  PieChartOutlined,
  RiseOutlined,
  ScheduleOutlined,
  SettingOutlined,
  SolutionOutlined,
  TableOutlined,
  TrophyOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { Avatar, Layout as AntdLayout, Menu } from 'antd';
import React, { FC, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useGetProfileQuery } from 'src/generated/graphql';

export type ActivePage =
  | 'info'
  | 'accounting'
  | 'planning'
  | 'scheduler'
  | 'operations'
  | 'incomes'
  | 'outcomes'
  | 'analysis'
  | 'analysis-category'
  | 'analysis-currency'
  | 'settings'
  | 'categories'
  | 'currencies'
  | 'connectors'
  | undefined;

export const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface LayoutProps {
  activePage?: ActivePage;
}

const MenuMap: Record<string, string> = {
  accounting: 'ledgers',
  incomes: 'transactions',
  outcomes: 'transactions',
  'analys-by-category': 'analys',
};

const Layout: FC<LayoutProps> = ({ activePage, children }) => {
  const [redirect, setRedirect] = useState<string | undefined>(undefined);
  const { data } = useGetProfileQuery();

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

  return (
    <AntdLayout>
      <AntdLayout.Header className="header">
        <Link to="/">
          <div className="logo" />
        </Link>
        <Menu theme="dark" mode="horizontal" style={{ float: 'right' }}>
          <Menu.SubMenu key="1" icon={<Avatar src={data?.profile.imageUrl?.toString()} />}>
            <Menu.Item key="2" icon={<SettingOutlined />}>
              Settings
            </Menu.Item>
            <Menu.Item key="3" icon={<LogoutOutlined />} onClick={logout}>
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
              <Menu.Item key="accounting" icon={<WalletOutlined />}>
                <Link to="/accounting">Wallets</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<TrophyOutlined />}>
                Goals
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="transactions" icon={<LaptopOutlined />} title="Transactions">
              <Menu.Item key="incomes" icon={<RiseOutlined />}>
                <Link to="/incomes">Incomes</Link>
              </Menu.Item>
              <Menu.Item key="outcomes" icon={<FallOutlined />}>
                <Link to="/outcomes">Outcomes</Link>
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
            <Menu.SubMenu key="analys" icon={<AreaChartOutlined />} title="Statistics">
              <Menu.Item key="analys-by-cateogories" icon={<PieChartOutlined />}>
                <Link to="/analysis-category">By Categories</Link>
              </Menu.Item>
              <Menu.Item key="16" icon={<PieChartOutlined />}>
                <Link to="/analysis-currency">By Currencies</Link>
              </Menu.Item>
              <Menu.Item key="17" icon={<BarChartOutlined />}>
                By Period
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="categories" icon={<BookOutlined />}>
              <Link to="/categories">Categories</Link>
            </Menu.Item>
            <Menu.Item key="currencies" icon={<MoneyCollectOutlined />}>
              <Link to="/currencies">Currencies</Link>
            </Menu.Item>
            <Menu.Item key="connectors" icon={<LinkOutlined />}>
              <Link to="/connectors">Connectors</Link>
            </Menu.Item>
          </Menu>
        </AntdLayout.Sider>
        <AntdLayout style={{ padding: '0 24px 24px' }}>
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
