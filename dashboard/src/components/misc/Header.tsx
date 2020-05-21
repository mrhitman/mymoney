import {
  BookOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  LineChartOutlined,
  LogoutOutlined,
  SettingOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { Menu, Space } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import React, { PureComponent } from 'react';

export type ActivePage =
  | 'info'
  | 'accounting'
  | 'planning'
  | 'scheduler'
  | 'analysis'
  | 'settings'
  | 'categories'
  | undefined;

interface HeaderProps {
  activePage: ActivePage;
  handleLogout: () => void;
  handleNavigate: (activePage: ActivePage) => void;
}

export class Header extends PureComponent<HeaderProps> {
  public render() {
    const { activePage, handleLogout, handleNavigate } = this.props;

    return (
      <div>
        <Menu
          mode="horizontal"
          selectedKeys={activePage ? [activePage] : activePage}
        >
          <Menu.Item
            key="info"
            icon={<InfoCircleOutlined />}
            onClick={this.navigate('info')}
          >
            Info
          </Menu.Item>
          <Menu.Item
            key="planning"
            icon={<WalletOutlined />}
            onClick={this.navigate('planning')}
          >
            Accounting
          </Menu.Item>
          <SubMenu icon={<BookOutlined />} title="Planning">
            <Menu.Item key="operations">Transactions</Menu.Item>
            <Menu.Item key="categories" onClick={this.navigate('categories')}>
              Categories
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            key="scheduler"
            icon={<CalendarOutlined />}
            onClick={this.navigate('scheduler')}
          >
            Scheduler
          </Menu.Item>
          <Menu.Item
            key="analysis"
            icon={<LineChartOutlined />}
            onClick={this.navigate('analysis')}
          >
            Analytics
          </Menu.Item>
          <Menu.Item
            key="settings"
            icon={<SettingOutlined />}
            onClick={this.navigate('settings')}
          />
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          />
        </Menu>
      </div>
    );
  }

  protected navigate = (page: ActivePage) => {
    const { activePage, handleNavigate } = this.props;
    return () => activePage !== page && handleNavigate(page);
  };
}

export default Header;
