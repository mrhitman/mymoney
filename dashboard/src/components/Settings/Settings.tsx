import { Col, Row, Select } from 'antd';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { UpdateProfile } from './UpdateProfile';

const Settings: FC = () => {
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
      <UpdateProfile />
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
  );
};

export default Settings;
