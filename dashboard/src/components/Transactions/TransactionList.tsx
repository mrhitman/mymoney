import {Popover, Table} from 'antd';
import {Transaction} from 'common';
import {Instance} from 'mobx-state-tree';
import moment from 'moment';
import React from 'react';
import {withTranslation, WithTranslation} from 'react-i18next';
import Icon from 'src/components/misc/Icon';

interface TransactionListState {
  total: number;
  loading: boolean;
  current: number;
  pageSize: number;
}

class TransactionList extends React.PureComponent<WithTranslation, TransactionListState> {
  public state = {
    current: 1,
    pageSize: 10,
    total: 0,
    loading: false,
  };

  public componentDidMount = () => {
    return this.fetchData();
  };

  protected fetchData = async () => {
    // await this.store.loadCurrencies();
    this.setState({loading: true});
    // const total = await this.store.loadTransactions({
    //   pageSize: this.state.pageSize,
    //   current: this.state.current,
    // });
    // this.setState({ total, loading: false });
  };

  public render() {
    return (
      <Table
        bordered
        showSorterTooltip
        loading={this.state.loading}
        pagination={{
          current: this.state.current,
          pageSize: this.state.pageSize,
          total: this.state.total,
        }}
        onChange={(pagination) => {
          this.setState({
            current: pagination.current || 1,
            pageSize: pagination.pageSize || 10,
            total: pagination.total || 0,
          });
          return this.fetchData();
        }}
        dataSource={[]}
      >
        <Table.Column
          title='id'
          dataIndex='id'
          key='id'
          render={(id) => (
            <Popover content={id}>
              <div>{id.slice(0, 3)}</div>
            </Popover>
          )}
        />
        <Table.Column title='Type' dataIndex='type' key='type' />
        <Table.Column
          title='Currency'
          dataIndex='currency'
          key='currency'
          render={(currency) => `${currency.description} (${currency.name})`}
        />
        <Table.Column
          title='Category'
          dataIndex='category'
          key='category'
          render={(category) => {
            return (
              <div>
                <div
                  className='category-icon'
                  style={{backgroundColor: category.icon.backgroundColor}}
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
          title='Amount'
          dataIndex='amount'
          key='amount'
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
          title='Description'
          dataIndex='description'
          key='description'
          render={(desc) =>
            desc ? (
              desc
            ) : (
                <p style={{color: 'grey', fontSize: '0.8em'}}>{'<NO INFO>'}</p>
              )
          }
        />
        <Table.Column
          title='Date'
          dataIndex='date'
          key='date'
          render={(date) => moment(date).format('LL')}
        />
      </Table>
    );
  }
}

export default withTranslation()(TransactionList);
