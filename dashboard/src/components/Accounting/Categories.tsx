import { inject, observer } from "mobx-react";
import React, { PureComponent } from "react";
import { InjectedStore } from "../../store/Store";

class Categories extends PureComponent<Partial<InjectedStore>> {
  public state = {
    categories: [],
  };

  public get store() {
    return this.props.store!;
  }

  public componentDidMount = async () => {
    const categories = await this.getCategories();
    this.setState({ categories });
  };

  public render() {
    return <div>Categories</div>;
  }

  protected getCategories = async () => {
    const categories = await this.store.getCategories();

    return categories;
  };
}

export default inject("store")(observer(Categories));
