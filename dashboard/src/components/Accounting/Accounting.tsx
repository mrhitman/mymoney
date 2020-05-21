import { inject, observer } from "mobx-react";
import React, { PureComponent } from "react";
import { InjectedStore } from "../../store/Store";

export class Accounting extends PureComponent<Partial<InjectedStore>> {
  public get store() {
    return this.props.store!;
  }

  public render() {
    return <div></div>;
  }
}

export default inject("store")(observer(Accounting));
