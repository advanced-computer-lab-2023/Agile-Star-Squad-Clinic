import React from 'react';

import styles from './CalendarItem.module.css';

const CalendarItem = (props) => {
  return (
    <button
      className={`${styles.dayCard} ${
        props.isChosen ? styles.chosen : styles.notChosen
      }`}
      onClick={() => props.onChooseDay(props.date)}
      disabled={props.isDisabled}
    >
      <p className={props.isChosen ? styles.chosenP : styles.notChosenP}>
        {props.dayOfWeek}
      </p>
      <p className={props.isChosen ? styles.chosenP : styles.notChosenP}>
        {props.date.getDate()}
      </p>
    </button>
  );
};

export default CalendarItem;
