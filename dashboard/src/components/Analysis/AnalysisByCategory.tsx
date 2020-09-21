import { SyncOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Button, Row, Col, Spin, DatePicker } from "antd";
import moment from "moment";
import React, { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  TransactionType,
  useAnalysByCategoriesQuery,
} from "src/generated/graphql";
import { VictoryPie, VictoryLegend, VictoryLabel } from "victory";

export const AnalysisByCategory: FC = () => {
  const [type, setType] = useState<TransactionType>(TransactionType.Outcome);
  const [from, setFrom] = useState<number | undefined>(
    moment().startOf("month").unix()
  );
  const [focused, setFocused] = useState<any | undefined>();
  const [to, setTo] = useState<number | undefined>(moment().unix());
  const { t } = useTranslation();
  console.log({
    headers: {
      "Authorization": localStorage.getItem('accessToken')
    }
  })
  const { loading, data, refetch } = useAnalysByCategoriesQuery({
    variables: { type, from, to },
    context: {
      headers: {
        "Authorization": localStorage.getItem('accessToken')
      }
    }
  });
  const total = data?.statisticByCategory.reduce(
    (acc, item) => acc + Math.abs(item.amount),
    0
  ) || 0;

  useEffect(() => {
    refetch({ type, from, to });
  }, [type]);

  return (
    <>
      <Row>
        <Col span={6}>
          <Row>
            <Col>
              <DatePicker.RangePicker
                showTime
                onCalendarChange={(values) => {
                  setFrom(values?.[0]?.unix());
                  setTo(values?.[1]?.unix());
                }}
              />
              <Dropdown
                overlay={() => (
                  <Menu>
                    <Menu.Item
                      key="income"
                      onClick={() => setType(TransactionType.Income)}
                    >
                      Income
                    </Menu.Item>
                    <Menu.Item
                      key="outcome"
                      onClick={() => setType(TransactionType.Outcome)}
                    >
                      Outcome
                    </Menu.Item>
                  </Menu>
                )}
                trigger={["click"]}
                placement="bottomCenter"
              >
                <Button
                  className="ant-dropdown-link"
                  onClick={() => refetch({ type, from, to })}
                >
                  {type}
                </Button>
              </Dropdown>
              <Button>
                <SyncOutlined />
              </Button>
            </Col>
            <Col span={24}></Col>
          </Row>
        </Col>
        <Col span={18}>
          <Row align="middle" justify="center" gutter={[10, 10]} style={{ marginBottom: -200 }}>
            <Col>
              <VictoryLegend
                title="Spends by categories"
                centerTitle
                orientation="horizontal"
                itemsPerRow={3}
                colorScale="qualitative"
                gutter={20}
                style={{
                  title: { fontSize: 22 },
                  labels: { fontSize: 16 },
                }}
                data={data?.statisticByCategory.map((item) => ({
                  name: t(item.category.name),
                }))}
              />

            </Col>
          </Row>
          <Row align="middle" justify="center" gutter={[10, 10]}>
            <Col span={17}>
              <Spin spinning={loading}>
                <VictoryPie
                  padAngle={1}
                  colorScale="qualitative"
                  style={{ labels: { fill: "black" } }}
                  innerRadius={60}
                  events={[
                    {
                      target: "data",
                      eventHandlers: {
                        onMouseOver: () => [
                          {
                            target: "data",
                            mutation: (data) => setFocused(data),
                          },
                          { target: "labels", mutation: (data) => { } },
                        ],
                      },
                    },
                  ]}
                  data={data?.statisticByCategory.map((data) => ({
                    x: data.category.name,
                    y: Math.abs(data.amount),
                    isFocused: data.category.name === focused?.datum.x,
                    amount: data.amount,
                  }))}
                  labels={({ datum }) => datum.isFocused || (datum.y / total) > 0.15 ? t(datum.x)! : ''}
                />
              </Spin>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
