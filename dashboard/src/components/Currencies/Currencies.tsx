import { useQuery } from '@apollo/client';
import { Popover, Table } from 'antd';
import { loader } from 'graphql.macro';
import React from 'react';
import { GetCurrenciesQuery } from 'src/generated/graphql';
import { useTranslation } from 'react-i18next';

const CurrenciesQuery = loader('src/queries/currencies.graphql')
export const Currencies: React.FC = () => {
  const { t } = useTranslation();
  const { loading, data, error } = useQuery<GetCurrenciesQuery>(
    CurrenciesQuery,
  );
  return (<Table
    bordered
    showSorterTooltip
    loading={loading}
    dataSource={[]}
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
    <Table.Column title="Type" dataIndex="type" key="type" />
    <Table.Column title="Name" dataIndex="name" key="name" render={name => t(name)} />
  </Table>)
}

export default Currencies;

