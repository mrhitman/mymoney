import moment from 'moment';

const ranges: Record<string, [moment.Moment, moment.Moment]> = {
  Today: [moment().utc().startOf('day'), moment().utc().endOf('day')],
  'This Week': [moment().utc().startOf('week'), moment().utc().endOf('week')],
  'This Month': [moment().utc().startOf('month'), moment().utc().endOf('month')],
  'Last 7 Days': [moment().utc().subtract(7, 'days'), moment().utc().endOf('day')],
  'Last 30 Days': [moment().utc().subtract(30, 'days'), moment().utc().endOf('day')],
};

export default ranges;
