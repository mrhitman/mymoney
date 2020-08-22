import {
  BookOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  LineChartOutlined,
  LogoutOutlined,
  SettingOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import {Menu} from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import ReactCountryFlag from 'react-country-flag';
import React, {PureComponent} from 'react';

export type ActivePage =
  | 'info'
  | 'accounting'
  | 'planning'
  | 'scheduler'
  | 'operations'
  | 'analysis'
  | 'analysis-category'
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
    const {activePage, handleLogout} = this.props;

    return (
      <Menu
        theme="dark"
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
          key="accounting"
          icon={<WalletOutlined />}
          onClick={this.navigate('accounting')}
        >
          Accounting
        </Menu.Item>
        <SubMenu icon={<BookOutlined />} title="Planning">
          <Menu.Item key="operations" onClick={this.navigate('operations')}>
            Transactions
          </Menu.Item>
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
        <SubMenu icon={<BookOutlined />} title="Analytics">
          <Menu.Item
            key="analysis"
            icon={<LineChartOutlined />}
            onClick={this.navigate('analysis')}
          >
            by Period
          </Menu.Item>
          <Menu.Item
            key="analysis-category"
            icon={<LineChartOutlined />}
            onClick={this.navigate('analysis-category')}
          >
            by Categories
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          key="settings"
          icon={
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <div style={{marginRight: 20}}>
                <ReactCountryFlag className="emojiFlag" countryCode="UA" />
              </div>
              <SettingOutlined />
            </div>
          }
          onClick={this.navigate('settings')}
        />
        <Menu.Item
          key="logout"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        />
      </Menu>
    );
  }

  protected navigate = (page: ActivePage) => {
    const {activePage, handleNavigate} = this.props;
    return () => activePage !== page && handleNavigate(page);
  };
}

export default Header;
