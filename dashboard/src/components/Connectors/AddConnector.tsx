import { Modal, Input, Form, Switch, Select, Divider } from 'antd'
import React from 'react'
import { Formik } from 'formik'
import { useAddConnectorMutation } from 'src/generated/graphql'

interface AddConnectorProps {
    show: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

export const AddConnector: React.FC<AddConnectorProps> = ({ show, onClose, onSubmit }) => {
    const [addConector] = useAddConnectorMutation({
        context: {
            headers: {
                Authorization: localStorage.getItem('accessToken')
            }
        }
    })
    return (
        <Formik
            initialValues={{
                type: "monobank",
                description: "",
                token: "",
                password: "",
                merchantId: "",
                enabled: true,
                interval: 900
            }}
            onSubmit={values => {
                addConector({
                    variables: {
                        type: values.type,
                        description: values.description,
                        interval: 900,
                        enabled: values.enabled,
                        params: {
                            token: values.token,
                            merchantId: values.merchantId,
                            password: values.password
                        }
                    }
                });
                onClose();
                onSubmit();
            }}
            render={(bag) => (
                <Modal
                    title={`Add ${bag.values.type} Connector`}
                    visible={show}
                    onOk={() => bag.handleSubmit()}
                    onCancel={onClose}
                    width={'80%'}
                    style={{ maxWidth: 900 }}
                    closable
                >
                    <Form labelCol={{ span: 8 }}>
                        <Form.Item label='Description' name='description'>
                            <Input value={bag.values.description} onChange={bag.handleChange('description')} />
                        </Form.Item>
                        <Form.Item label='Type' name='type'>
                            <Select value={bag.values.type} defaultValue={bag.initialValues.type} onChange={bag.handleChange('type')}>
                                <Select.Option value="monobank">Monobank</Select.Option>
                                <Select.Option value="privat24">Privat24</Select.Option>
                            </Select>
                        </Form.Item>
                        {bag.values.type === 'monobank' && <Form.Item label='Token' name='token'>
                            <Input value={bag.values.token} onChange={bag.handleChange('token')} />
                        </Form.Item>}
                        {bag.values.type === 'privat24' && <>
                            <Form.Item label='Password' name='password'>
                                <Input value={bag.values.password} onChange={bag.handleChange('password')} />
                            </Form.Item>
                            <Form.Item label='Merchant Id' name='merchantId'>
                                <Input value={bag.values.merchantId} onChange={bag.handleChange('merchantId')} />
                            </Form.Item>
                        </>}
                        <Form.Item label="Enable sync"  >
                            <div style={{ float: 'right' }}>
                                <Switch checked={bag.values.enabled} onChange={checked => bag.setFieldValue('enabled', checked)} />
                            </div>
                        </Form.Item>
                        <Divider />
                    </Form>
                </Modal>
            )}
        />
    )
}

export default AddConnector;