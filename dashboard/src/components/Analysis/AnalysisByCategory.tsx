import { DownOutlined, SyncOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Button } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { VictoryPie } from 'victory';
import { api, InjectedStore } from '../../store/Store';

interface AnalysisByCategoryState {
  data: Array<any>;
  loading: boolean;
  type: 'income' | 'outcome';
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
    loading: !false,
    type: 'outcome',
  };

  public componentDidMount() {
    return this.fetchData();
  }

  protected fetchData = async () => {
    const response = await api.client('/transactions/statistic-categories/');
    this.setState({ loading: true });
    const data = response.data as any[];
    this.setState({ data, loading: false });
  };

  public render() {
    return (
      <div>
        <Dropdown
          overlay={() => (
            <Menu>
              <Menu.Item
                key="income"
                onClick={() => this.setState({ type: 'income' })}
              >
                Income
              </Menu.Item>
              <Menu.Item
                key="outcome"
                onClick={() => this.setState({ type: 'outcome' })}
              >
                Outcome
              </Menu.Item>
            </Menu>
          )}
          trigger={['click']}
        >
          <span className="ant-dropdown-link">
            {this.state.type} <DownOutlined />
          </span>
        </Dropdown>
        <Button onClick={this.fetchData}>
          <SyncOutlined spin={this.state.loading} />
        </Button>
        <VictoryPie
          colorScale={'qualitative'}
          style={{ labels: { fill: 'black' } }}
          innerRadius={80}
          labelRadius={120}
          labels={({ datum }) => `${this.props.t(datum.x)}`}
          data={this.state.data
            .filter(({ category }) => category.type === this.state.type)
            .map(({ category, amount }) => {
              return { x: category.name, y: Math.abs(amount) };
            })}
        />
      </div>
    );
  }
}

export default withTranslation()(inject('store')(observer(AnalysisByCategory)));
