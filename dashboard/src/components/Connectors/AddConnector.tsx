import {
    Divider,
    Form,
    Input,
    Modal,
    Select,
    Switch
} from 'antd';
import { useFormik } from 'formik';
import React from 'react';
import { useAddConnectorMutation } from 'src/generated/graphql';

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
    });
    const formik = useFormik({
        initialValues: {
            type: "monobank",
            description: "",
            token: "",
            password: "",
            merchantId: "",
            enabled: true,
            interval: 900
        },
        onSubmit: values => {
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
        }
    });

    return (
        <Modal
            title={`Add ${formik.values.type} Connector`}
            visible={show}
            onOk={() => formik.handleSubmit()}
            onCancel={e => {
                e.stopPropagation();
                onClose();
            }}
            width={'80%'}
            style={{ maxWidth: 900 }}
            closable
        >
            <Form labelCol={{ span: 8 }}>
                <Form.Item label='Description' name='description'>
                    <Input value={formik.values.description} onChange={e => formik.setFieldValue('description', e.target.value)} />
                </Form.Item>
                <Form.Item label='Type' name='type'>
                    <Select value={formik.values.type} defaultValue={formik.initialValues.type} onChange={value => formik.setFieldValue('type', value)}>
                        <Select.Option value="monobank">Monobank</Select.Option>
                        <Select.Option value="privat24">Privat24</Select.Option>
                    </Select>
                </Form.Item>
                {formik.values.type === 'monobank' && <Form.Item label='Token' name='token'>
                    <Input value={formik.values.token} onChange={e => formik.setFieldValue('token', e.target.value)} />
                </Form.Item>}
                {formik.values.type === 'privat24' && <>
                    <Form.Item label='Password' name='password'>
                        <Input value={formik.values.password} onChange={e => formik.setFieldValue('password', e.target.value)} />
                    </Form.Item>
                    <Form.Item label='Merchant Id' name='merchantId'>
                        <Input value={formik.values.merchantId} onChange={e => formik.setFieldValue('merchantId', e.target.value)} />
                    </Form.Item>
                </>}
                <Form.Item label="Enable sync">
                    <div style={{ float: 'right' }}>
                        <Switch checked={formik.values.enabled} onChange={checked => formik.setFieldValue('enabled', checked)} />
                    </div>
                </Form.Item>
                <Divider />
            </Form>
        </Modal>
    );
}

export default AddConnector;