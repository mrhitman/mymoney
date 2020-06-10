import { Button, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react';
import { InjectedStore } from 'src/store/Store';
import AddWalletForm from './AddWalletForm';

interface AddWalletState {
  visible: boolean;
}

class AddWallet extends PureComponent<Partial<InjectedStore>, AddWalletState> {
  public state: AddWalletState = {
    visible: false,
  };

  public get store() {
    return this.props.store!;
  }

  public render() {
    return (
      <div>
        <Button onClick={this.showModal}>Create new wallet</Button>
        <Modal
          title="Add new wallet"
          visible={this.state.visible}
          onCancel={this.handleCancel}
        >
          <AddWalletForm />
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

export default inject('store')(observer(AddWallet));
