import { useQuery } from '@apollo/client';
import { Popover, Table } from 'antd';
import { loader } from 'graphql.macro';
import React from 'react';
import { GetCurrenciesQuery } from 'src/generated/graphql';
import { useTranslation } from 'react-i18next';
import Flag from 'react-world-flags';

const CurrenciesQuery = loader('src/queries/currencies.graphql')
export const Currencies: React.FC = () => {
  const { t } = useTranslation();
  const { loading, data, error } = useQuery<GetCurrenciesQuery>(
    CurrenciesQuery,
  );
  return (
    <>
      <Table
        bordered
        showSorterTooltip
        loading={loading}
        dataSource={data?.currencies || []}
      >
        <Table.Column
          title="id"
          dataIndex="id"
          key="id"
          render={(id) => (
            <Popover content={id}>
              <div>{id.slice(0, 3)}</div>
            </Popover>
          )}
        />
        <Table.Column title="Flag" dataIndex="name" render={(name) => <Flag code={name.slice(0, 2).toUpperCase()} height={24} width={32} />} />
        <Table.Column title="Symbol" dataIndex="symbol" key="symbol" />
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column title="Description" dataIndex="description" key="description" />
        <Table.Column title="Code" dataIndex="code" key="code" />
        <Table.Column title="Rate (to EUR)" dataIndex="rate" key="rate" render={rate => rate.toFixed(3)} />
      </Table>
    </>)
}

export default Currencies;

