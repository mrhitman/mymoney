import React, { FC } from 'react';
import { Form, Input } from 'antd';
import { useFormik } from 'formik';
import { useUpdateProfileMutation } from 'src/generated/graphql';

export const UpdateProfile: FC = () => {
    const [updateProfile] = useUpdateProfileMutation();
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            middleName: '',
            oldPassword: '',
            newPassword: ''
        },
        onSubmit: values => {
            updateProfile({
                variables: {
                    profileUpdateData: values
                }
            })
        }
    });


    return (
        <div>
            <Form>
                <Form.Item label="First name">
                    <Input
                        value={formik.values.firstName}
                        onChange={e => formik.setFieldValue('firstName', e.target.value)}
                    />
                </Form.Item>
                <Form.Item label="Last name">
                    <Input
                        value={formik.values.lastName}
                        onChange={e => formik.setFieldValue('lastName', e.target.value)}
                    />
                </Form.Item>
                <Form.Item label="Middle name">
                    <Input
                        value={formik.values.middleName}
                        onChange={e => formik.setFieldValue('middleName', e.target.value)}
                    />
                </Form.Item>
                <Form.Item label="New Password">
                    <Input
                        type="password"
                        onChange={e => formik.setFieldValue('newPassword', e.target.value)}
                    />
                </Form.Item>
                <Form.Item label="Old Password">
                    <Input
                        type="password"
                        onChange={e => formik.setFieldValue('oldPassword', e.target.value)}
                    />
                </Form.Item>
            </Form>
        </div>);
}