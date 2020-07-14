import { Button, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react';
import { InjectedStore } from 'src/store/Store';
import AddWalletForm from './AddWalletForm';
import { FormikProps } from 'formik';

interface AddWalletState {
  visible: boolean;
  bag?: FormikProps<any>;
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
          title='Add new wallet'
          visible={this.state.visible}
          onOk={() => this.state.bag?.submitForm()}
          onCancel={this.handleCancel}
        >
          <AddWalletForm
            onInit={(bag) => !this.state.bag && this.setState({ bag })}
            onSubmit={() => this.setState({ visible: false })}
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

export default inject('store')(observer(AddWallet));
