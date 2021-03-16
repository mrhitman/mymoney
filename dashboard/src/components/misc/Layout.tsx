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
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { logout } from 'src/auth';
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
  | 'active-budget'
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
  const { data } = useGetProfileQuery();
  const { t } = useTranslation();

  return (
    <AntdLayout>
      <AntdLayout.Header className="header">
        <Link to="/">
          <div className="logo" />v 0.0.4
        </Link>
        <Menu theme="dark" mode="horizontal" style={{ float: 'right' }}>
          <Menu.SubMenu
            key="1"
            icon={<Avatar src={data?.profile.imageUrl?.toString()} />}
          >
            <Menu.Item key="2" icon={<SettingOutlined />}>
              <Link to="/settings">{t('settings')}</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<LogoutOutlined />} onClick={logout}>
              {t('logout')}
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
            <Menu.SubMenu
              key="ledgers"
              icon={<DollarOutlined />}
              title={t('ledgers')}
            >
              <Menu.Item key="accounting" icon={<WalletOutlined />}>
                <Link to="/accounting">{t('wallets')}</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<TrophyOutlined />}>
                {t('goals')}
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="transactions"
              icon={<LaptopOutlined />}
              title={t('transactions')}
            >
              <Menu.Item key="outcomes" icon={<FallOutlined />}>
                <Link to="/outcomes">{t('outcomes')}</Link>
              </Menu.Item>
              <Menu.Item key="incomes" icon={<RiseOutlined />}>
                <Link to="/incomes">{t('incomes')}</Link>
              </Menu.Item>
              <Menu.Item key="7" icon={<ArrowsAltOutlined />}>
                {t('transfers')}
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sub3"
              icon={<TableOutlined />}
              title={t('budget')}
            >
              <Menu.Item key="9" icon={<CarryOutOutlined />}>
                <Link to="/budgets/active">{t('current')}</Link>
              </Menu.Item>
              <Menu.Item key="10" icon={<ScheduleOutlined />}>
                {t('planning')}
              </Menu.Item>
              <Menu.Item key="11" icon={<SolutionOutlined />}>
                {t('archive')}
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="analys"
              icon={<AreaChartOutlined />}
              title={t('statistics')}
            >
              <Menu.Item
                key="analysis-by-categories"
                icon={<PieChartOutlined />}
              >
                <Link to="/analysis-category">{t('by_categories')}</Link>
              </Menu.Item>
              <Menu.Item key="16" icon={<PieChartOutlined />}>
                <Link to="/analysis-currency">{t('by_currencies')}</Link>
              </Menu.Item>
              <Menu.Item key="17" icon={<BarChartOutlined />}>
                {t('by_period')}
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="categories" icon={<BookOutlined />}>
              <Link to="/categories">{t('categories')}</Link>
            </Menu.Item>
            <Menu.Item key="currencies" icon={<MoneyCollectOutlined />}>
              <Link to="/currencies">{t('currencies')}</Link>
            </Menu.Item>
            <Menu.Item key="connectors" icon={<LinkOutlined />}>
              <Link to="/connectors">{t('connectors')}</Link>
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
