import { Cell, Column, Table } from "@blueprintjs/table";
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
    return (
      <Table numRows={this.state.categories.length}>
        <Column name="Id" cellRenderer={this.renderCell("id")} />
        <Column name="Name" cellRenderer={this.renderCell("name")} />
        <Column name="Type" cellRenderer={this.renderCell("type")} />
      </Table>
    );
  }

  protected getCategories = async () => {
    const categories = await this.store.getCategories();

    return categories;
  };

  protected renderCell = (field: string) => {
    return (rowIndex: number) => (
      <Cell>{this.state.categories[rowIndex][field]}</Cell>
    );
  };
}

export default inject("store")(observer(Categories));
