import {
    DeleteOutlined
} from '@ant-design/icons';
import {
    Button,
    Col,
    Input,
    List,
    Row
} from 'antd';
import { FormikProps } from 'formik';
import React, { FC } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { AddWalletValues } from './AddWalletForm';

export interface PocketValues {
    currencyId: string;
    amount: number;
}

interface PocketItemProps {
    formik: FormikProps<AddWalletValues>;
    pocket: PocketValues;
}

export const PocketItem: FC<PocketItemProps> = ({ formik, pocket }) => {
    return (
        <List.Item
            actions={[
                <Button
                    type='dashed'
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() =>
                        formik.setFieldValue(
                            'pockets',
                            formik.values.pockets.filter(
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
                        <span style={{ marginRight: 10 }}>
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