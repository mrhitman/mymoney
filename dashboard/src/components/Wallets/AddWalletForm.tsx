import {
  AppstoreAddOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  AutoComplete,
  Button,
  Checkbox,
  Col, Collapse, Form,
  Input,
  List,
  Row,
  Tag,
} from 'antd';
import {Formik, FormikHelpers, FormikProps} from 'formik';
import React, {PureComponent} from 'react';
import ReactCountryFlag from 'react-country-flag';
import {withTranslation, WithTranslation} from 'react-i18next';
import {formLayout} from '../misc/Layout';

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

interface AddWalletFormProps {
  onSubmit: () => void;
  onInit: (bag: FormikProps<any>) => void;
}

interface AddWalletFormState {
  currencyFilter: string;
  addingTag: boolean;
  selectedCurrencyId?: string;
}

class AddWalletForm extends PureComponent<AddWalletFormProps & WithTranslation, AddWalletFormState> {
  public state: AddWalletFormState = {
    currencyFilter: '',
    addingTag: false,
  };

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
              currencyId: '',
              amount: 0,
            },
          ],
          tags: [] as string[],
        }}
        onSubmit={this.handleSubmit}
        render={(bag) => (
          <Form {...formLayout} onSubmitCapture={bag.handleSubmit}>
            <Form.Item label='Name' name='name'>
              <Input onChange={bag.handleChange('name')} />
            </Form.Item>
            <Form.Item label='Description' name='description'>
              <Input.TextArea onChange={bag.handleChange('description')} />
            </Form.Item>
            <Form.Item label='Tags' name='tags'>
              {bag.values.tags.map((tag, i) => (
                <Tag key={`${tag}-${i}`} closable>
                  <span>{tag}</span>
                </Tag>
              ))}
              {this.state.addingTag ? (
                <Input
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                      bag.setFieldValue('tags', [
                        ...bag.values.tags,
                        (e.target as HTMLInputElement).value,
                      ]);

                      this.setState({addingTag: false});
                    }
                  }}
                />
              ) : (
                  <Tag
                    className='site-tag-plus'
                    onClick={() => this.setState({addingTag: true})}
                  >
                    <PlusOutlined /> New Tag
                  </Tag>
                )}
            </Form.Item>
            <Collapse accordion>
              <Collapse.Panel key='1' header='Options'>
                <Form.Item
                  label='Allow negative balance'
                  name='allow_negative_balance'
                  labelCol={{span: 22}}
                >
                  <Checkbox
                    defaultChecked={bag.values.allow_negative_balance}
                    onChange={(e) =>
                      bag.setFieldValue(
                          'allow_negative_balance',
                          e.target.checked,
                      )
                    }
                  />
                </Form.Item>
                <Form.Item
                  label='Allow negative balance'
                  name='use_in_balance'
                  labelCol={{span: 22}}
                >
                  <Checkbox
                    defaultChecked={bag.values.use_in_balance}
                    onChange={(e) =>
                      bag.setFieldValue('use_in_balance', e.target.checked)
                    }
                  />
                </Form.Item>
                <Form.Item
                  label='Allow negative balance'
                  name='use_in_analytics'
                  labelCol={{span: 22}}
                >
                  <Checkbox
                    defaultChecked={bag.values.use_in_analytics}
                    onChange={(e) =>
                      bag.setFieldValue('use_in_analytics', e.target.checked)
                    }
                  />
                </Form.Item>
              </Collapse.Panel>
              <Collapse.Panel key='2' header='Pockets'>
                <Form.Item label='Pockets' name='pockets'>
                  <List
                    itemLayout='horizontal'
                    dataSource={bag.values.pockets}
                    renderItem={this.renderPocketItem(bag)}
                  />

                  <AutoComplete
                    value={this.state.currencyFilter}
                    onSearch={(text) => this.setState({currencyFilter: text})}
                    onSelect={(name) => { }}
                    options={[]}
                  >
                    <Input.Search placeholder='input here' enterButton />
                  </AutoComplete>
                  <Button
                    type='dashed'
                    icon={<AppstoreAddOutlined />}
                    disabled={!this.state.selectedCurrencyId}
                    onClick={() => {
                      bag.setFieldValue('pockets', [
                        ...bag.values.pockets,
                        {
                          currencyId: this.state.selectedCurrencyId,
                          amount: 0,
                        },
                      ]);
                      this.setState({
                        selectedCurrencyId: undefined,
                        currencyFilter: '',
                      });
                    }}
                  >
                    Add pocket
                  </Button>
                </Form.Item>
              </Collapse.Panel>
            </Collapse>
            {this.props.onInit(bag)}
          </Form>
        )}
      />
    );
  }

  protected renderPocketItem = (bag: FormikProps<AddWalletValues>) => (
      pocket: PocketValues,
  ) => {
    return (
      <List.Item
        actions={[
          <Button
            type='dashed'
            danger
            icon={<DeleteOutlined />}
            onClick={() =>
              bag.setFieldValue(
                  'pockets',
                  bag.values.pockets.filter(
                      (p) => p.currencyId !== pocket.currencyId,
                  ),
              )
            }
          />,
        ]}
      >
        <List.Item.Meta
          title={
            <div>
              <span style={{marginRight: 10}}>
                <ReactCountryFlag
                  className='emojiFlag'
                  countryCode={'UA'}
                />
              </span>
              <span>UAH</span>
            </div>
          }
        />
        <Row>
          <Col xs={12} offset={2}>
            DESCR
          </Col>
          <Col xs={8} offset={2}>
            <Input placeholder='0' size='small' />
          </Col>
        </Row>
      </List.Item>
    );
  };

  protected handleSubmit = async (
    values: AddWalletValues,
    formikHelpers: FormikHelpers<AddWalletValues>,
  ) => {
    // this.store.addWallet(values);
    // this.props.onSubmit();
    formikHelpers.resetForm();
  };
}

export default withTranslation()(AddWalletForm);
