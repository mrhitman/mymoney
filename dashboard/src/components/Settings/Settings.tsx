import { Col, Row, Select, Button } from 'antd';
import React, { FC } from 'react';
import { useGetProfileQuery } from 'src/generated/graphql';
import { useTranslation } from 'react-i18next';
import { EditOutlined } from '@ant-design/icons';

const Settings: FC = () => {
  const { data } = useGetProfileQuery();
  const { t, i18n } = useTranslation();

  return (
    <Row>
      <Col span={7}>
        <img
          src={'https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg'}
          width={300}
          height={300}
          alt="profile img"
        />
      </Col>
      <Col span={17}>
        <Row>
          <Col span={4}>{t('first_name')}:</Col>
          <Col>{data?.profile.firstName}</Col>
        </Row>
        <Row>
          <Col span={4}>{t('last_name')}:</Col>
          <Col>{data?.profile.lastName}</Col>
        </Row>
        <Row>
          <Col span={4}>{t('middle_name')}:</Col>
          <Col>{data?.profile.middleName}</Col>
        </Row>
        <Row>
          <Col span={4}>Email</Col>
          <Col>{data?.profile.email}</Col>
        </Row>
        <Button icon={<EditOutlined />}>
          Update
        </Button>
        <Row>
          <Col span={4}>{t('language')}</Col>
          <Col>
            <Select
              onChange={(e: string) => {
                i18n.changeLanguage(e);
                localStorage.setItem('lng', e);
              }}
              value={localStorage.getItem('lng') || 'ru'}
            >
              <Select.Option value="en">English</Select.Option>
              <Select.Option value="ru">Русский</Select.Option>
            </Select>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Settings;
