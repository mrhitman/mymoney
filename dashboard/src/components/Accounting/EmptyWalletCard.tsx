import { WalletOutlined } from "@ant-design/icons";
import { Card, Divider, Row } from "antd";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";

interface EmptyWalletCardProps {
    onClick: () => void;
}
const EmptyWalletCard: FC<EmptyWalletCardProps> = ({ onClick }) => {
    const { t } = useTranslation();

    return <Card
        hoverable
        style={{ width: 298, height: 166, marginTop: 16 }}
        onClick={onClick}
    >
        <Row>
            <WalletOutlined style={{ fontSize: 30 }} />
        </Row>
        <Divider />
        <Card.Meta title={t("wallet_add")} />
    </Card>
}

export default EmptyWalletCard;