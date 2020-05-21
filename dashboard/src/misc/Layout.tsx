import { inject, observer } from "mobx-react";
import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { InjectedStore } from "../store/Store";
import Header, { ActivePage } from "./Header";

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
      <div>
        <div className="layout">
          <Header
            activePage={activePage}
            handleLogout={this.logout}
            handleNavigate={this.navigate}
          />
        </div>
        <div className="layout">
          <div className="left_menu">left menu</div>
          <div className="content">{this.props.children}</div>
        </div>
        <div>footer</div>
      </div>
    );
  }

  protected logout = async () => {
    await this.store.logout();
    this.setState({ redirect: "/login" });
  };

  protected navigate = async (page: ActivePage) => {
    this.setState({ redirect: page ? `/${page}` : "/" });
  };
}

export default inject("store")(observer(Layout));
