import { Layout as AntdLayout } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { InjectedStore } from '../../store/Store';
import Wallets from '../Wallets/Wallets';
import MenuHeader, { ActivePage } from './Header';
import Rates from '../Rates/Rates';

interface LayoutProps extends Partial<InjectedStore> {
  activePage?: ActivePage;
}

interface LayoutState {
  redirect?: string;
}

class Layout extends PureComponent<LayoutProps, LayoutState> {
  public state: LayoutState = {
    redirect: undefined,
  };

  public get store() {
    return this.props.store!;
  }

  public render() {
    const { activePage } = this.props;

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} exact />;
    }

    return (
      <AntdLayout>
        <AntdLayout.Sider collapsible defaultCollapsed width={180} />
        <AntdLayout>
          <AntdLayout.Header>
            <div className="logo" />
            <MenuHeader
              activePage={activePage}
              handleLogout={this.logout}
              handleNavigate={this.navigate}
            />
          </AntdLayout.Header>
          <AntdLayout.Content>
            <div
              style={{
                maxWidth: 300,
                marginRight: 10,
              }}
            >
              <Wallets />
              <Rates />
            </div>
            {this.props.children}
          </AntdLayout.Content>
          <AntdLayout.Footer />
        </AntdLayout>
      </AntdLayout>
    );
  }

  protected logout = async () => {
    try {
      await this.store.logout();
    } finally {
      this.setState({ redirect: '/login' });
    }
  };

  protected navigate = async (page: ActivePage) => {
    this.setState({ redirect: page ? `/${page}` : '/' });
  };
}

export default inject('store')(observer(Layout));
