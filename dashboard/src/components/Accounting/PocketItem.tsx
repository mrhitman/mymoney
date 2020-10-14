import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Input, List, Row } from "antd";
import { FormikProps } from "formik";
import React, { FC } from "react";
import ReactCountryFlag from "react-country-flag";
import { useGetCurrenciesQuery } from "src/generated/graphql";
import { AddWalletValues } from "./types";

interface PocketItemProps {
  formik: FormikProps<AddWalletValues>;
  pocket: AddWalletValues["pockets"][number];
}

export const PocketItem: FC<PocketItemProps> = ({ formik, pocket }) => {
  const { data } = useGetCurrenciesQuery();
  const getActiveCurrency = () => data?.currencies.find((c) => c.id === pocket.currencyId);

  return (
    <List.Item
      actions={[
        <Button
          key={pocket.currencyId}
          type="dashed"
          danger
          icon={<DeleteOutlined />}
          onClick={() =>
            formik.setFieldValue(
              "pockets",
              formik.values.pockets.filter((p) => p.currencyId !== pocket.currencyId)
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
                className="emojiFlag"
                countryCode={getActiveCurrency()?.name.slice(0, 2)}
              />
            </span>
            <span>{getActiveCurrency()?.name}</span>
          </div>
        }
      />
      <Row>
        <Col offset={4}>
          <Input
            placeholder="0"
            size="middle"
            value={pocket.amount}
            addonAfter={getActiveCurrency()?.symbol}
            onChange={(e) => {
              formik.setFieldValue(
                "pockets",
                formik.values.pockets.map((p) =>
                  p.currencyId === pocket.currencyId
                    ? { ...p, amount: parseFloat(e.target.value) || 0 }
                    : p
                )
              );
            }}
          />
        </Col>
      </Row>
    </List.Item>
  );
};
