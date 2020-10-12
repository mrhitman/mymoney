import { WalletOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Card, Col, Divider, List, Row, Skeleton, Typography } from "antd";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useGetWalletsQuery } from "src/generated/graphql";
import AddWallet from "./AddWallet";

export const icons: Record<string, string> = {
  "monobank-black": "https://www.monobank.com.ua/resources/static-1/img/logo-medium-192x192.png",
  "Privat24 Card": "https://xpc.com.ua/image/catalog/general/page/a_icon/privat24.svg",
  "default-card":
    "https://www.nicepng.com/png/full/104-1044427_png-library-download-drawing-at-getdrawings-com-free.png",
};

const layout = { xs: 24, sm: 24, md: 12, lg: 6 };

export const Accounting: FC = () => {
  const { loading, data } = useGetWalletsQuery({
    context: {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    },
  });
  const wallets = data ? data.wallets : [];

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Wallets</Breadcrumb.Item>
      </Breadcrumb>
      <Skeleton loading={loading}>
        <Row gutter={16}>
          {wallets.map((wallet) => {
            return (
              <Col id={wallet.id} {...layout}>
                <Card hoverable style={{ width: 300, marginTop: 16 }} loading={loading}>
                  <Link to={`/operations/${wallet.id}`}>
                    <Card.Meta
                      title={wallet.name.slice(0, 6) + "******"}
                      description={wallet.description}
                      avatar={<Avatar src={icons[wallet.type || "default-card"]} />}
                    />
                    <Divider />
                    <List
                      dataSource={wallet.pockets}
                      renderItem={(pocket) => (
                        <Typography>
                          {pocket.currency.symbol} {pocket.amount} {pocket.currency.name}
                        </Typography>
                      )}
                    />
                  </Link>
                </Card>
              </Col>
            );
          })}
          <Card hoverable style={{ width: 298, height: 166, marginTop: 16 }}>
            <Row>
              <WalletOutlined style={{ fontSize: 30 }} />
            </Row>
            <Divider />
            <Card.Meta title={"Add wallet"} />
            <AddWallet />
          </Card>
        </Row>
      </Skeleton>
    </>
  );
};

export default Accounting;
