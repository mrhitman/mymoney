import { Badge, Calendar } from 'antd';
import moment, { Moment } from 'moment';
import React, { PureComponent } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

interface CalendarViewState {
  view: 'year' | 'month';
  time: moment.Moment;
}

class CalendarView extends PureComponent<WithTranslation, CalendarViewState> {
  public state: CalendarViewState = {
    time: moment(),
    view: 'month',
  };

  public componentDidMount = async () => {
    // await this.store.loadCurrencies();
    await this.fetchData();
    this.forceUpdate();
  };

  protected fetchData = async () => {
    // return this.store.loadTransactions({
    //   start: this.state.time.startOf('year').unix(),
    //   end: this.state.time.endOf('year').unix(),
    // });
  };

  public render() {
    return (
      <Calendar
        onChange={(time) => this.setState({ time }, this.fetchData)}
        onPanelChange={(time, view) => this.setState({ time, view }, this.fetchData)}
        dateCellRender={this.dateCellRender}
      />
    );
  }

  protected dateCellRender = (date: Moment) => {
    const items = [] as any[];
    // this.store.transactions.filter((trx) => {
    // return moment(trx.date).format('L') === date.format('L');
    // });

    return (
      <ul className="events">
        {items.map((item: any) => (
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

export default withTranslation()(CalendarView);
