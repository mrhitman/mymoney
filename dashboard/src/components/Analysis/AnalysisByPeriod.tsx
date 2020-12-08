import React, { PureComponent } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

interface AnalysisByPeriodState {
  data: Array<{ a: Date; b: number }>;
  interval: 'week' | 'day' | 'month' | 'year';
}

class AnalysisByPeriod extends PureComponent<
  WithTranslation,
  AnalysisByPeriodState
  > {

  public render() {
    return <div />;
  }
}

export default withTranslation()(AnalysisByPeriod);
