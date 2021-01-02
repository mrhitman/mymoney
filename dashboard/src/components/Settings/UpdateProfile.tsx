import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input } from 'antd';
import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetProfileQuery, useUpdateProfileMutation } from 'src/generated/graphql';
import { omit } from 'lodash';

export const UpdateProfile: FC = () => {
  const [updateProfile] = useUpdateProfileMutation();
  const { data } = useGetProfileQuery();
  const { t } = useTranslation();
  const [editing, setEditing] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: data?.profile.firstName || '',
      lastName: data?.profile.lastName || '',
      middleName: data?.profile.middleName || '',
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      if (values.password && values.password !== values.confirmPassword) {
        return;
      }

      updateProfile({
        variables: {
          profileUpdateData: omit(values, ['confirmPassword']),
        },
      });
    },
  });

  return (
    <Col span={17}>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 12 }}>
        <Form.Item label={t('first_name')}>
          <Input
            value={formik.values.firstName}
            onChange={(e) => formik.setFieldValue('firstName', e.target.value)}
            readOnly={!editing}
          />
        </Form.Item>
        <Form.Item label={t('last_name')}>
          <Input
            value={formik.values.lastName}
            onChange={(e) => formik.setFieldValue('lastName', e.target.value)}
            readOnly={!editing}
          />
        </Form.Item>
        <Form.Item label={t('middle_name')}>
          <Input
            value={formik.values.middleName}
            onChange={(e) => formik.setFieldValue('middleName', e.target.value)}
            readOnly={!editing}
          />
        </Form.Item>
        <Form.Item label={t('email')}>
          <Input value={data?.profile.email} readOnly />
        </Form.Item>
        <Form.Item label={t('old_password')}>
          <Input
            type="password"
            onChange={(e) => formik.setFieldValue('oldPassword', e.target.value)}
            readOnly={!editing}
          />
        </Form.Item>
        <Form.Item label={t('password')}>
          <Input
            type="password"
            onChange={(e) => formik.setFieldValue('password', e.target.value)}
            readOnly={!editing}
          />
        </Form.Item>
        <Form.Item label={t('confirm_password')}>
          <Input
            type="password"
            onChange={(e) => formik.setFieldValue('confirmPassword', e.target.value)}
            readOnly={!editing}
          />
        </Form.Item>
      </Form>
      <Col offset={10}>
        <Button icon={<EditOutlined />} onClick={() => setEditing(true)}>
          Edit
        </Button>
        <Button
          icon={<SaveOutlined />}
          onClick={() => {
            setEditing(false);
            formik.handleSubmit();
          }}
        >
          Save
        </Button>
      </Col>
    </Col>
  );
};
