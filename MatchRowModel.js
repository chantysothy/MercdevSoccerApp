import moment from 'moment';
moment.locale('ru');

class MatchRowModel  {
  constructor(parseObject) {
    Object.assign(this, {
      dateTime: moment(parseObject.get('dateTime')).format('DD MMMM YYYY'),
      score: (parseObject.get('greenGoals') || '') + ':' + (parseObject.get('purpleGoals') || ''),
      parseObject: parseObject
    });
  }
}

export default MatchRowModel;