import React from 'react';

import styles from './CalendarItem.module.css';

const CalendarItem = (props) => {
  return (
    <button
      className={`${styles.dayCard} ${
        props.isChosen ? styles.chosen : styles.notChosen
      }`}
      onClick={() => props.onChooseDate(props.date)}
    >
      <p
        className={`${styles.p} ${
          props.isChosen ? styles.chosenP : styles.notChosenP
        }`}
      >
        {props.dayOfWeek}
      </p>
      <p
        className={`${styles.p} ${
          props.isChosen ? styles.chosenP : styles.notChosenP
        }`}
      >
        {props.date.getDate()}
      </p>
    </button>
  );
};

export default CalendarItem;
