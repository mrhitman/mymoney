import moment from 'moment';

const today = moment().utc();
const ranges: Record<string, [moment.Moment, moment.Moment]> = {
  Today: [today.startOf('day'), today.endOf('day')],
  'This Week': [today.startOf('week'), today.endOf('week')],
  'This Month': [today.startOf('month'), today.endOf('month')],
  'Last 7 Days': [today.subtract(7, 'days'), today.endOf('day')],
  'Last 30 Days': [today.subtract(30, 'days'), today.endOf('day')],
};

export default ranges;
