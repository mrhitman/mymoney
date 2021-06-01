import { Moment, utc } from 'moment';

const ranges: Record<string, [Moment, Moment]> = {
  Today: [utc().startOf('day'), utc().endOf('day')],
  'This Week': [utc().startOf('week'), utc().endOf('week')],
  'This Month': [utc().startOf('month'), utc().endOf('month')],
  'Last 7 Days': [utc().subtract(7, 'days'), utc().endOf('day')],
  'Last 30 Days': [utc().subtract(30, 'days'), utc().endOf('day')],
  'Last 100 Days': [utc().subtract(100, 'days'), utc().endOf('day')],
  'Last Year': [utc().subtract(1, 'year'), utc().endOf('day')],
};

export default ranges;
