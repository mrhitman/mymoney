import {
  PlusOutlined,
  DeleteOutlined,
  AppstoreAddOutlined,
} from '@ant-design/icons';
import {
  Row,
  Col,
  Collapse,
  Form,
  Input,
  Switch,
  Tag,
  List,
  Avatar,
  Button,
} from 'antd';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';
import { InjectedStore } from 'src/store/Store';
import { formLayout } from '../misc/Layout';
import * as Colors from 'common/src/utils/colors';
import { sample } from 'lodash';

interface PocketValues {
  currencyId: string;
  amount: number;
}
export interface AddWalletValues {
  name: string;
  description: string;
  allow_negative_balance: boolean;
  use_in_balance: boolean;
  use_in_analytics: boolean;
  tags: string[];
  pockets: Array<PocketValues>;
}

class AddWalletForm extends PureComponent<
  Partial<InjectedStore> & WithTranslation
> {
  public get store() {
    return this.props.store!;
  }

  public render() {
    return (
      <Formik
        initialValues={{
          name: '',
          description: '',
          allow_negative_balance: true,
          use_in_balance: true,
          use_in_analytics: true,
          pockets: [
            {
              currencyId: this.store.currencies.find((c) => c.name === 'UAH')!
                .id,
              amount: 0,
            },
          ],
          tags: ['my', 'money', 'wallet'],
        }}
        onSubmit={this.handleSubmit}
        render={(bag) => (
          <Form {...formLayout} onSubmitCapture={bag.handleSubmit}>
            <Form.Item label="Name" name="name">
              <Input onChange={bag.handleChange('name')} />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea onChange={bag.handleChange('description')} />
            </Form.Item>
            <Collapse>
              <Collapse.Panel
                header="Options"
                key="switchers"
                className="site-collapse-custom-panel"
              >
                <Form.Item
                  label="Allow negative balance"
                  name="allow_negative_balance"
                >
                  <Switch
                    defaultChecked={bag.values.allow_negative_balance}
                    onChange={(checked: boolean) =>
                      bag.setFieldValue('allow_negative_balance', checked)
                    }
                  />
                </Form.Item>
                <Form.Item label="Allow negative balance" name="use_in_balance">
                  <Switch
                    defaultChecked={bag.values.use_in_balance}
                    onChange={(checked: boolean) =>
                      bag.setFieldValue('use_in_balance', checked)
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="Allow negative balance"
                  name="use_in_analytics"
                >
                  <Switch
                    defaultChecked={bag.values.use_in_analytics}
                    onChange={(checked: boolean) =>
                      bag.setFieldValue('use_in_analytics', checked)
                    }
                  />
                </Form.Item>
              </Collapse.Panel>
            </Collapse>
            <Form.Item label="Tags" name="tags">
              {bag.values.tags.map((tag, i) => (
                <Tag color={sample(Colors)} key={`${tag}-${i}`} closable>
                  <span>{tag}</span>
                </Tag>
              ))}
              <Tag className="site-tag-plus">
                <PlusOutlined /> New Tag
              </Tag>
            </Form.Item>
            <Form.Item label="Pockets" name="pockets">
              <List
                itemLayout="horizontal"
                dataSource={bag.values.pockets}
                renderItem={this.renderPocketItem(bag)}
              />
              <Button
                type="dashed"
                icon={<AppstoreAddOutlined />}
                onClick={() =>
                  bag.setFieldValue('pockets', [
                    ...bag.values.pockets,
                    {
                      currencyId: sample(this.store.currencies)?.id,
                      amount: 0,
                    },
                  ])
                }
              >
                Add pocket
              </Button>
            </Form.Item>
          </Form>
        )}
      />
    );
  }

  protected renderPocketItem = (bag: FormikProps<AddWalletValues>) => (
    pocket: PocketValues
  ) => {
    const currency = this.store.currencies.find(
      (c) => c.id === pocket.currencyId
    )!;

    return (
      <List.Item
        actions={[
          <Button
            type="dashed"
            danger
            icon={<DeleteOutlined />}
            onClick={() =>
              bag.setFieldValue(
                'pockets',
                bag.values.pockets.filter(
                  (p) => p.currencyId !== pocket.currencyId
                )
              )
            }
          />,
        ]}
      >
        <List.Item.Meta
          title={
            <div>
              <span style={{ marginRight: 10 }}>
                <ReactCountryFlag
                  className="emojiFlag"
                  countryCode={currency.name.slice(0, 2)}
                />
              </span>
              <span>{currency.name}</span>
            </div>
          }
        />
        <Row>
          <Col xs={12} offset={2}>
            {currency.description}
          </Col>
          <Col xs={8} offset={2}>
            <Input placeholder="0" size="small" />
          </Col>
        </Row>
      </List.Item>
    );
  };

  protected handleSubmit = async (
    values: AddWalletValues,
    formikHelpers: FormikHelpers<AddWalletValues>
  ) => {
    console.log(values);
    formikHelpers.resetForm();
  };
}

export default withTranslation()(inject('store')(observer(AddWalletForm)));
