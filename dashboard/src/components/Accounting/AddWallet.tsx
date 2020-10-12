import { Button, Modal } from "antd";
import React, { FC, useState } from "react";
import AddWalletForm from "./AddWalletForm";

export const AddWallet: FC = () => {
  const [visible, setVisible] = useState(false);
  const [bag, setBag] = useState<any>();

  return (
    <div>
      <Button onClick={() => setVisible(true)}>Create new wallet</Button>
      <Modal
        title="Add new wallet"
        visible={visible}
        onOk={() => bag?.handleSubmit()}
        onCancel={() => setVisible(false)}
      >
        <AddWalletForm
          onInit={(bag: any) => !bag && setBag(bag)}
          onSubmit={() => setVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default AddWallet;
