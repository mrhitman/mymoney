import React, { useState } from "react";
import { loader } from "graphql.macro";
import { useQuery } from "@apollo/client";
import { GetConnectorsQuery } from "src/generated/graphql";
import moment from 'moment';
import { Skeleton, Row, Col, Card, Divider, Switch, Typography } from "antd";

const ConnectorsQuery = loader("src/queries/connectors.graphql");
const layout = { xs: 24, sm: 24, md: 12, lg: 6 };
const images: Record<string, string> = {
    privat24: "https://pbs.twimg.com/profile_images/660498508567461888/ChmxAbO6_400x400.png",
    monobank: "https://is4-ssl.mzstatic.com/image/thumb/Purple114/v4/fc/e0/4a/fce04ad4-bbed-abb4-e5c0-ced1b2a31e72/source/256x256bb.jpg"
}

export const Connectors: React.FC = () => {
    const { loading, error, data } = useQuery<GetConnectorsQuery>(
        ConnectorsQuery
    );
    const connectors = data ? data.connectors : [];
    console.log(connectors);
    return (
        <Skeleton loading={loading}>
            <Row gutter={16}>
                {connectors.map((connector) => {
                    return (
                        <Col id={connector.id} {...layout}>
                            <Card
                                hoverable
                                loading={loading}
                                cover={<img src={images[connector.type]} />}
                            >
                                <Card.Meta title={connector.type} />
                                <Divider />
                                <Typography>Added: {moment.unix(Number(connector.createdAt) / 1000).format('L HH:mm')}</Typography>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Skeleton>
    );
};

export default Connectors;
