import { Badge, Calendar } from 'antd';
import { inject, observer } from 'mobx-react';
import moment, { Moment } from 'moment';
import React, { PureComponent } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { InjectedStore } from 'src/store/Store';
import { Instance } from 'mobx-state-tree';
import { Transaction } from 'common';

class CalendarView extends PureComponent<
  Partial<InjectedStore> & WithTranslation
> {
  public get store() {
    return this.props.store!;
  }

  public componentDidMount = async () => {
    await this.store.loadCurrencies();
    await this.store.loadTransactions({
      current: 1,
      pageSize: 100,
    });
    this.forceUpdate();
  };

  public render() {
    return <Calendar dateCellRender={this.dateCellRender} />;
  }

  protected dateCellRender = (date: Moment) => {
    const items = this.store.transactions.filter((trx) => {
      return moment(trx.date).format('L') === date.format('L');
    });

    return (
      <ul className='events'>
        {items.map((item: Instance<typeof Transaction>) => (
          <li key={item.id}>
            <Badge
              status={item.type === 'income' ? 'success' : 'error'}
              text={`${this.props.t(item.category.name)} ${item.amount}`}
            />
          </li>
        ))}
      </ul>
    );
  };
}

export default withTranslation()(inject('store')(observer(CalendarView)));
