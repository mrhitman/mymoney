import { Col, Row } from 'antd';
import React, { FC } from 'react';
import { useGetProfileQuery } from 'src/generated/graphql';

const Settings: FC = () => {
  const { data } = useGetProfileQuery();

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
          <Col span={4}>First name:</Col>
          <Col>{data?.profile.firstName}</Col>
        </Row>
        <Row>
          <Col span={4}>Last name:</Col>
          <Col>{data?.profile.lastName}</Col>
        </Row>
        <Row>
          <Col span={4}>Middle name:</Col>
          <Col>{data?.profile.middleName}</Col>
        </Row>
        <Row>
          <Col span={4}>Email</Col>
          <Col>{data?.profile.email}</Col>
        </Row>
        <Row>
          <Col span={4}>Language</Col>
          <Col>{data?.profile.additional?.language || 'en'}</Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Settings;
