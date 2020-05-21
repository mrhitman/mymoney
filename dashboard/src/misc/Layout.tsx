import React, {PureComponent} from "react";

export class Layout extends PureComponent {
  public render() {
    return (
      <div>
        <div>header</div>
        <div className="layout">
          <div className="left_menu">left menu</div>
          <div className="content">{this.props.children}</div>
        </div>
        <div>footer</div>
      </div>
    );
  }
}

export default Layout;
