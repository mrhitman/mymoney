import { Button, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react';
import { InjectedStore } from '../../store/Store';
import AddOutcomeForm from './AddOutcomeForm';
import AddIncomeForm from './AddIncomeForm';

interface AddTransactionState {
  visible: boolean;
  operation: 'income' | 'outcome' | 'transfer';
}

const Forms = {
  income: AddIncomeForm,
  outcome: AddOutcomeForm,
  transfer: AddOutcomeForm,
};

class AddTransaction extends PureComponent<
  Partial<InjectedStore>,
  AddTransactionState
> {
  public state: AddTransactionState = {
    visible: false,
    operation: 'outcome',
  };

  public get store() {
    return this.props.store!;
  }

  public componentDidMount = async () => {
    await this.store.loadProfile();
  };

  public render() {
    const FormComponent = Forms[this.state.operation];
    return (
      <div>
        <Button onClick={this.showModal}>Add transaction</Button>
        <Modal
          title="Add transaction"
          visible={this.state.visible}
          onCancel={this.handleCancel}
        >
          <FormComponent />
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
