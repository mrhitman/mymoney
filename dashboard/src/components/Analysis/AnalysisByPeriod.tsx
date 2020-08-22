import {Button, Dropdown, Menu} from 'antd';
import React, {PureComponent} from 'react';
import {withTranslation, WithTranslation} from 'react-i18next';
import {
  DomainTuple,
  VictoryAxis,
  VictoryBrushContainer,
  VictoryChart,
  VictoryLine,
  VictoryZoomContainer,
} from 'victory';

interface AnalysisByPeriodState {
  data: Array<{ a: Date; b: number }>;
  interval: 'week' | 'day' | 'month' | 'year';
  zoomDomain?: {
    x?: DomainTuple;
    y?: DomainTuple;
  };
}

class AnalysisByPeriod extends PureComponent<WithTranslation, AnalysisByPeriodState> {
  public state: AnalysisByPeriodState = {
    interval: 'day',
    data: [],
  };

  public handleZoom = (domain: { x?: DomainTuple; y?: DomainTuple }) => {
    this.setState({zoomDomain: domain});
  };

  public componentDidMount() {
    return this.fetchData();
  }

  protected fetchData = async () => {
    // const response = await api.client(
    //   '/transactions/statistic/' + this.state.interval
    // );
    // const data = response.data;

    // this.setState({
    //   data: Object.keys(data).map((time) => {
    //     return { a: moment.unix(+time).toDate(), b: data[time] };
    //   }),
    // });
  };

  public render() {
    return (
      <div style={{display: 'flex'}}>
        <div>
          <Dropdown
            overlay={() => (
              <Menu>
                <Menu.Item
                  key="day"
                  onClick={() =>
                    this.setState({interval: 'day'}, this.fetchData)
                  }
                >
                  Day
                </Menu.Item>
                <Menu.Item
                  key="week"
                  onClick={() =>
                    this.setState({interval: 'week'}, this.fetchData)
                  }
                >
                  Week
                </Menu.Item>
                <Menu.Item
                  key="month"
                  onClick={() =>
                    this.setState({interval: 'month'}, this.fetchData)
                  }
                >
                  Month
                </Menu.Item>
                <Menu.Item
                  key="year"
                  onClick={() =>
                    this.setState({interval: 'year'}, this.fetchData)
                  }
                >
                  Year
                </Menu.Item>
              </Menu>
            )}
            trigger={['click']}
            placement="bottomCenter"
          >
            <Button>{this.state.interval}</Button>
          </Dropdown>
        </div>
        <VictoryChart
          width={600}
          height={470}
          scale={{x: 'time'}}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom}
            />
          }
        >
          <VictoryLine
            style={{
              data: {stroke: 'tomato'},
            }}
            data={this.state.data}
            x="a"
            y="b"
          />
        </VictoryChart>
        <VictoryChart
          padding={{top: 0, left: 50, right: 50, bottom: 30}}
          width={600}
          height={100}
          scale={{x: 'time'}}
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
              data: {stroke: 'tomato'},
            }}
            data={this.state.data}
            x="a"
            y="b"
          />
        </VictoryChart>
      </div>
    );
  }
}

export default withTranslation()(AnalysisByPeriod);
