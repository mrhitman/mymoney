import { Button, Modal } from "antd";
import { inject, observer } from "mobx-react";
import React, { PureComponent } from "react";
import { InjectedStore } from "../../store/Store";
import AddTransactionForm from "./AddTransactionForm";
import { FormikProps } from "formik";
import { AddTransactionValues } from "./AddTransactionForm";

interface AddTransactionState {
  visible: boolean;
  operation: "income" | "outcome" | "transfer";
  bag?: FormikProps<AddTransactionValues>;
}

class AddTransaction extends PureComponent<
  Partial<InjectedStore>,
  AddTransactionState
> {
  public state: AddTransactionState = {
    visible: false,
    operation: "outcome",
  };

  public get store() {
    return this.props.store!;
  }

  public componentDidMount = async () => {
    await this.store.loadProfile();
  };

  public render() {
    return (
      <div>
        <Button onClick={this.showModal}>Add transaction</Button>
        <Modal
          title="Add transaction"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onOk={() => this.state.bag?.submitForm()}
        >
          <AddTransactionForm
            onInit={(bag) => !this.state.bag && this.setState({ bag })}
          />
        </Modal>
      </div>
    );
  }

  protected showModal = () => {
    this.setState({ visible: true });
  };

  protected handleCancel = () => {
    this.setState({ visible: false });
  };
}

export default inject("store")(observer(AddTransaction));
