import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { InjectedStore } from '../../store/Store';
import { Collapse } from 'antd';

class Rates extends PureComponent<Partial<InjectedStore>> {
  protected timerId?: NodeJS.Timer;
  public get store() {
    return this.props.store!;
  }

  public componentDidMount = async () => {
    await this.store.loadRates(true);
    this.timerId = setInterval(() => this.store.loadRates(true), 3600 * 1000);
  };

  public componentWillUnmount = () => {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }
  };

  public render() {
    return (
      <Collapse>
        <Collapse.Panel header="Rates" key="rates">
          {this.store.rates.rates.map(this.renderRate)}
        </Collapse.Panel>
      </Collapse>
    );
  }

  protected renderRate = (rate: { name: string; rate: number }) => {
    return (
      <div key={rate.name} className="row-item">
        <div>{rate.name}</div>
        <div>{rate.rate}</div>
      </div>
    );
  };
}

export default inject('store')(observer(Rates));
