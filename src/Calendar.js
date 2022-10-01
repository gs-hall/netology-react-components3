import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { extendMoment } from 'moment-range';


export default function Calendar({date}) {
  Moment.updateLocale('en', {
    week: {
      dow: 1,
    },
  });  
  const m = Moment(date);

  const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const monthsGenitive = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
  const weekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресение'];
  const shortWeekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const dayOfWeek = m.weekday();
  const dayOfWeekStr = weekDays[dayOfWeek];

  const currentDay = m.date();
  const currentMonth = m.month();
  const monthStr = months[currentMonth];
  const monthGenitiveStr = monthsGenitive[currentMonth];
  const year = m.year();

  const columnElement = [...Array(7)].map((item, i) => (
    <col className={i > 4 ? 'ui-datepicker-week-end' : null} key={i}/>
  ))

  const headerElement = weekDays.map((weekDay, index) => (
    <th scope="col" title={weekDay} key={index}>{shortWeekDays[index]}</th>
  ));

  const firstDayOfFirstWeek = m.clone().startOf('month').startOf('week');
  const lastDayOfLastWeek = m.clone().endOf('month').endOf('week');
  const moment = extendMoment(Moment);
  var range = moment().range(firstDayOfFirstWeek, lastDayOfLastWeek);
  
  const days = Array.from(range.by('day')).map((day, index) => (
    <td
      className={day.isSame(m, 'date') ? 'ui-datepicker-today' :
        day.month() !== currentMonth ? 'ui-datepicker-other-month' :
        null}
      key={index}>
        {day.format('D')}
    </td>
  ));

  let rows = [];
  let row = [];
  days.forEach((day, i) => {
    if (i % 7 === 0) {
      rows.push(row);
      row = [];
    }
    row.push(day);
  });
  rows.push(row);

  let rowsElement = rows.map((row, index) => {
    return <tr key={index}>{row}</tr>;
  })

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{dayOfWeekStr}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{currentDay}</div>
          <div className="ui-datepicker-material-month">{monthGenitiveStr}</div>
          <div className="ui-datepicker-material-year">{year}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{monthStr}</span>&nbsp;<span className="ui-datepicker-year">{year}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          {columnElement}
        </colgroup>
        <thead>
          <tr>
            {headerElement}
          </tr>
        </thead>
        <tbody>
          {rowsElement}
        </tbody>
      </table>
    </div>
  );
};

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date)
}