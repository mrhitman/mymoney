import { Popover, Table } from 'antd';
import { Transaction } from 'common';
import { inject, observer } from 'mobx-react';
import { Instance, flow } from 'mobx-state-tree';
import moment from 'moment';
import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { InjectedStore } from 'src/store/Store';
import Icon from 'src/components/misc/Icon';

class TransactionList extends React.PureComponent<
  Partial<InjectedStore> & WithTranslation
> {
  public get store() {
    return this.props.store!;
  }

  public componentDidMount = async () => {
    await this.store.loadCurrencies();
    await this.store.loadTransactions();
  };

  public render() {
    return (
      <Table
        dataSource={this.store.transactions
          .sort((t2, t1) => moment(t1.date).unix() - moment(t2.date).unix())
          .map((t) => t)}
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
        <Table.Column
          title="Currency"
          dataIndex="currency"
          key="currency"
          render={(currency) => `${currency.description} (${currency.name})`}
        />
        <Table.Column
          title="Category"
          dataIndex="category"
          key="category"
          render={(category) => {
            return (
              <div>
                <div
                  style={{
                    padding: 3,
                    margin: 3,
                    marginRight: 10,
                    borderRadius: 20,
                    width: 24,
                    height: 24,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    float: 'left',
                    backgroundColor: category.icon.backgroundColor,
                  }}
                >
                  <Icon
                    name={category.icon.name}
                    type={category.icon.type}
                    color={'white'}
                    size={12}
                  />
                </div>
                {this.props.t(category.name)}
              </div>
            );
          }}
        />
        <Table.Column
          title="Amount"
          dataIndex="amount"
          key="amount"
          render={(amount, record: Instance<typeof Transaction>) => {
            switch (record.type) {
              case 'income':
                return <div className={`tbl-${record.type}`}>+{amount}</div>;
              case 'outcome':
                return <div className={`tbl-${record.type}`}>-{amount}</div>;
              case 'transfer':
                return <div className={`tbl-${record.type}`}>{amount}</div>;
            }
          }}
        />
        <Table.Column
          title="Description"
          dataIndex="description"
          key="description"
          render={(desc) =>
            desc ? (
              desc
            ) : (
              <p style={{ color: 'grey', fontSize: '0.8em' }}>{'<NO INFO>'}</p>
            )
          }
        />
        <Table.Column
          title="Date"
          dataIndex="date"
          key="date"
          render={(date) => moment(date).format('LL')}
        />
      </Table>
    );
  }
}

export default withTranslation()(inject('store')(observer(TransactionList)));
