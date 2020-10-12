import { AppstoreAddOutlined, PlusOutlined } from "@ant-design/icons";
import { AutoComplete, Button, Checkbox, Collapse, Form, Input, List, Tag } from "antd";
import { FormikProps, useFormik } from "formik";
import React, { FC, useState } from "react";
import { formLayout } from "../misc/Layout";
import { PocketItem, PocketValues } from "./PocketItem";

export interface AddWalletValues {
  name: string;
  description: string;
  allow_negative_balance: boolean;
  use_in_balance: boolean;
  use_in_analytics: boolean;
  tags: string[];
  pockets: Array<PocketValues>;
}

interface AddWalletFormProps {
  onSubmit: () => void;
  onInit: (bag: FormikProps<any>) => void;
}

const AddWalletForm: FC<AddWalletFormProps> = (props) => {
  const [currencyFilter, setCurrencyFilter] = useState("");
  const [addingTag, setAddingTag] = useState(false);
  const [selectedCurrencyId, setSelectedCurrencyId] = useState<string>();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      allow_negative_balance: true,
      use_in_balance: true,
      use_in_analytics: true,
      pockets: [
        {
          currencyId: "",
          amount: 0,
        },
      ],
      tags: [] as string[],
    },
    onSubmit: console.log,
  });

  return (
    <Form {...formLayout} onSubmitCapture={formik.handleSubmit}>
      <Form.Item label="Name" name="name">
        <Input onChange={(e) => formik.setFieldValue("name", e.target.value)} />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea onChange={(e) => formik.setFieldValue("description", e.target.value)} />
      </Form.Item>
      <Form.Item label="Tags" name="tags">
        {formik.values.tags.map((tag, i) => (
          <Tag key={`${tag}-${i}`} closable>
            <span>{tag}</span>
          </Tag>
        ))}
        {addingTag ? (
          <Input
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                formik.setFieldValue("tags", [
                  ...formik.values.tags,
                  (e.target as HTMLInputElement).value,
                ]);

                setAddingTag(false);
              }
            }}
          />
        ) : (
            <Tag className="site-tag-plus" onClick={() => setAddingTag(true)}>
              <PlusOutlined /> New Tag
            </Tag>
          )}
      </Form.Item>
      <Collapse accordion>
        <Collapse.Panel key="1" header="Options">
          <Form.Item
            label="Allow negative balance"
            name="allow_negative_balance"
            labelCol={{ span: 22 }}
          >
            <Checkbox
              defaultChecked={formik.values.allow_negative_balance}
              onChange={(e) => formik.setFieldValue("allow_negative_balance", e.target.checked)}
            />
          </Form.Item>
          <Form.Item label="Allow negative balance" name="use_in_balance" labelCol={{ span: 22 }}>
            <Checkbox
              defaultChecked={formik.values.use_in_balance}
              onChange={(e) => formik.setFieldValue("use_in_balance", e.target.checked)}
            />
          </Form.Item>
          <Form.Item label="Allow negative balance" name="use_in_analytics" labelCol={{ span: 22 }}>
            <Checkbox
              defaultChecked={formik.values.use_in_analytics}
              onChange={(e) => formik.setFieldValue("use_in_analytics", e.target.checked)}
            />
          </Form.Item>
        </Collapse.Panel>
        <Collapse.Panel key="2" header="Pockets">
          <Form.Item label="Pockets" name="pockets">
            <List
              itemLayout="horizontal"
              dataSource={formik.values.pockets}
              renderItem={(pocket) => <PocketItem formik={formik} pocket={pocket} />}
            />

            <AutoComplete
              value={currencyFilter}
              onSearch={(text) => setCurrencyFilter(text)}
              onSelect={(name) => { }}
              options={[]}
            >
              <Input.Search placeholder="input here" enterButton />
            </AutoComplete>
            <Button
              type="dashed"
              icon={<AppstoreAddOutlined />}
              disabled={!selectedCurrencyId}
              onClick={() => {
                formik.setFieldValue("pockets", [
                  ...formik.values.pockets,
                  {
                    currencyId: selectedCurrencyId,
                    amount: 0,
                  },
                ]);
                setSelectedCurrencyId(undefined);
                setCurrencyFilter("");
              }}
            >
              Add pocket
            </Button>
          </Form.Item>
        </Collapse.Panel>
      </Collapse>
      {props.onInit(formik)}
    </Form>
  );
};

export default AddWalletForm;
