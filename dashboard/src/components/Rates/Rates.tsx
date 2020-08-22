import React, {PureComponent} from 'react';
import {Collapse} from 'antd';

class Rates extends PureComponent {
  protected timerId?: NodeJS.Timer;

  public componentDidMount = async () => {
    // await this.store.loadCurrencies();
    // this.timerId = setInterval(() => this.store.loadRates(true), 3600 * 1000);
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
        </Collapse.Panel>
      </Collapse>
    );
  }

  protected renderRate = (rate: { name: string; rate: number }) => {
    // const currency = this.store.currencies.find((c) => c.name === rate.name);

    return (
      <div key={rate.name} className="row-item">
        <div>
          {/* {currency?.description} ({rate.name}) */}
        </div>
        <div>{rate.rate}</div>
      </div>
    );
  };
}

export default Rates;
