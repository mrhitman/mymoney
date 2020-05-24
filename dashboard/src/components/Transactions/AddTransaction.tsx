import { Button, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react';
import { InjectedStore } from '../../store/Store';
import AddOutcomeForm from './AddOutcomeForm';

interface AddTransactionState {
  visible: boolean;
}

class AddTransaction extends PureComponent<
  Partial<InjectedStore>,
  AddTransactionState
> {
  public state: AddTransactionState = {
    visible: false,
  };

  public get store() {
    return this.props.store!;
  }

  public render() {
    return (
      <div>
        <Button onClick={this.showModal}>Add transaction</Button>
        <Modal
          title="Add transaction"
          visible={this.state.visible}
          onCancel={this.handleCancel}
        >
          <AddOutcomeForm />
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
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

export default inject('store')(observer(AddTransaction));
