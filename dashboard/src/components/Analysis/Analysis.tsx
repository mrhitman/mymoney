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
    zoomDomain: { x: [new Date(), new Date()] },
  };

  public handleZoom = (domain: { x?: DomainTuple; y?: DomainTuple }) => {
    this.setState({ zoomDomain: domain });
  };

  public componentDidMount() {
    return this.fetchData();
  }

  protected fetchData = async () => {
    await this.store.loadTransactions({
      start: moment().startOf('year').unix(),
      end: moment().endOf('year').unix(),
    });
    const transactions = this.store.transactions.sort(
      (a, b) => moment(a).unix() - moment(b).unix()
    );
    const first = transactions.shift();
    const last = transactions.pop();

    this.setState({
      zoomDomain: {
        x: [
          (first && first.date) || this.state.zoomDomain.x![0],
          (last && last.date) || this.state.zoomDomain.x![1],
        ],
      },
    });
  };

  protected getData = () => {
    const data = this.store.transactions
      .map((trx, i, transactions) => {
        const amount = transactions
          .filter((t) => moment(trx.date).unix() >= moment(t.date).unix())
          .reduce((s, t) => {
            return s + (t.type === 'outcome' ? -1 * t.amount : t.amount);
          }, 0);

        return {
          a: trx.date,
          b: amount,
        };
      })
      .sort((a, b) => moment(a.a).unix() - moment(b.a).unix());

    return data;
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
              zoomDimension='x'
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom}
            />
          }
        >
          <VictoryLine
            style={{
              data: { stroke: 'tomato' },
            }}
            data={this.getData()}
            x='a'
            y='b'
          />
        </VictoryChart>
        <VictoryChart
          padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
          width={600}
          height={100}
          scale={{ x: 'time' }}
          containerComponent={
            <VictoryBrushContainer
              brushDimension='x'
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
            x='a'
            y='b'
          />
        </VictoryChart>
      </div>
    );
  }
}

export default withTranslation()(inject('store')(observer(Analysis)));
