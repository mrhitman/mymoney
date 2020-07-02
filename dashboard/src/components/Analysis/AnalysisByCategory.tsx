import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { DomainTuple, VictoryPie } from 'victory';
import { api, InjectedStore } from '../../store/Store';
import { Checkbox } from 'antd';

interface AnalysisByCategoryState {
  data: Array<{ x: string; y: number }>;
  income: boolean;
  zoomDomain: {
    x?: DomainTuple;
    y?: DomainTuple;
  };
}

class AnalysisByCategory extends PureComponent<
  Partial<InjectedStore> & WithTranslation,
  AnalysisByCategoryState
> {
  public get store() {
    return this.props.store!;
  }

  public state: AnalysisByCategoryState = {
    data: [],
    income: false,
    zoomDomain: { x: [new Date(), new Date()] },
  };

  public handleZoom = (domain: { x?: DomainTuple; y?: DomainTuple }) => {
    this.setState({ zoomDomain: domain });
  };

  public componentDidMount() {
    return this.fetchData();
  }

  protected fetchData = async () => {
    const response = await api.client('/transactions/statistic-categories/');
    const data = response.data as any[];

    this.setState({
      data: data
        .filter(
          ({ category }) =>
            category.type === (this.state.income ? 'income' : 'outcome')
        )
        .map(({ category, amount }) => {
          return { x: category.name, y: Math.abs(amount) };
        }),
    });
  };

  public render() {
    return (
      <>
        <Checkbox
          checked={this.state.income}
          value={this.state.income}
          onChange={() => {
            this.setState({ income: !this.state.income }, this.fetchData);
          }}
        >
          Incomes
        </Checkbox>
        <VictoryPie
          style={{ labels: { fill: 'white' } }}
          innerRadius={100}
          labelRadius={120}
          labels={({ datum }) => this.props.t(datum.x) as any}
          data={this.state.data}
        />
      </>
    );
  }
}

export default withTranslation()(inject('store')(observer(AnalysisByCategory)));
