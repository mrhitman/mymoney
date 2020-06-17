import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import {
  DomainTuple,
  VictoryAxis,
  VictoryBrushContainer,
  VictoryChart,
  VictoryLine,
  VictoryZoomContainer,
} from 'victory';
import moment from 'moment';
import { InjectedStore } from '../../store/Store';

interface AnalysisState {
  zoomDomain: {
    x?: DomainTuple;
    y?: DomainTuple;
  };
}

class Analysis extends PureComponent<
  Partial<InjectedStore> & WithTranslation,
  AnalysisState
> {
  public get store() {
    return this.props.store!;
  }

  public state: AnalysisState = {
    zoomDomain: { x: [new Date(2020, 5, 16), new Date(2020, 5, 18)] },
  };

  public handleZoom = (domain: { x?: DomainTuple; y?: DomainTuple }) => {
    this.setState({ zoomDomain: domain });
  };

  public componentDidMount() {
    return this.fetchData();
  }

  protected fetchData = () => {
    return this.store.loadTransactions();
  };

  protected getData = () => {
    return this.store.transactions
      .map((trx) => {
        return {
          date: trx.date,
          amount: trx.type === 'outcome' ? -1 * trx.amount : trx.amount,
        };
      })
      .sort((a, b) => moment(a).unix() - moment(b).unix())
      .reduce(
        (acc, value, i) => [
          ...acc,
          {
            ...value,
            amount: i ? acc[i - 1].amount + value.amount : value.amount,
          },
        ],
        [] as { date: Date; amount: number }[]
      );
  };

  public render() {
    return (
      <div style={{ display: 'flex' }}>
        <VictoryChart
          width={600}
          height={470}
          scale={{ x: 'time' }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          <VictoryLine
            style={{
              data: { stroke: 'tomato' },
            }}
            data={this.getData()}
            x="date"
            y="amount"
          />
        </VictoryChart>
        <VictoryChart
          padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
          width={600}
          height={100}
          scale={{ x: 'time' }}
          containerComponent={
            <VictoryBrushContainer
              brushDimension="x"
              brushDomain={this.state.zoomDomain}
              onBrushDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          <VictoryAxis tickFormat={(x) => new Date(x).getFullYear()} />
          <VictoryLine
            style={{
              data: { stroke: 'tomato' },
            }}
            data={this.getData()}
            x="key"
            y="amount"
          />
        </VictoryChart>
      </div>
    );
  }
}

export default withTranslation()(inject('store')(observer(Analysis)));
