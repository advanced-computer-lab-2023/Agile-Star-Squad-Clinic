import React from 'react';

import './CalendarItem.css';

const CalendarItem = (props) => {
  console.log(props.class + '-p');
  return (
    <button
      className={`day-card ${props.class}`}
      onClick={() => props.onChooseDay(props.date)}
      disabled={props.isDisabled}
    >
      <p className={props.class + '-p'}>{props.dayOfWeek}</p>
      <p className={props.class + '-p'}>{props.date.getDate()}</p>
    </button>
  );
};

export default CalendarItem;
