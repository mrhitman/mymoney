import { Button, Modal } from 'antd';
import React, { PureComponent } from 'react';
import AddTransactionForm from './AddTransactionForm';
import { FormikProps } from 'formik';
import { AddTransactionValues } from './AddTransactionForm';

interface AddTransactionState {
  visible: boolean;
  operation: 'income' | 'outcome' | 'transfer';
  bag?: FormikProps<AddTransactionValues>;
}

class AddTransaction extends PureComponent<{}, AddTransactionState> {
  public state: AddTransactionState = {
    visible: false,
    operation: 'outcome',
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
            onInit={(bag: any) => !this.state.bag && this.setState({ bag })}
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

export default AddTransaction;
