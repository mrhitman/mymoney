import React, { FC } from 'react';
import { Form, Input } from 'antd';
import { useFormik } from 'formik';

export const UpdateProfile: FC = () => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            middleName: '',
        },
        onSubmit: console.log,
    });

    return (
        <div>
            <Form>
                <Form.Item label="First name">
                    <Input value={formik.values.firstName} />
                </Form.Item>
                <Form.Item label="Last name">
                    <Input value={formik.values.lastName} />
                </Form.Item>
                <Form.Item label="Middle name">
                    <Input value={formik.values.middleName} />
                </Form.Item>
                <Form.Item label="New Password">
                    <Input type="password" />
                </Form.Item>
                <Form.Item label="Old Password">
                    <Input type="password" />
                </Form.Item>
            </Form>
        </div>);
}