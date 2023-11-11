import React from 'react';

import styles from './CalendarItem.module.css';

const CalendarItem = (props) => {
  const isDisabled = new Date() > props.date;
  return (
    <button
      className={`${styles.dayCard} ${
        props.isChosen ? styles.chosen : styles.notChosen
      }`}
      onClick={() => props.onChooseDate(props.date)}
      disabled={isDisabled}
    >
      <p
        className={`${styles.p} ${
          props.isChosen ? styles.chosenP : styles.notChosenP
        } ${isDisabled ? styles.disabledText : null}`}
      >
        {props.dayOfWeek}
      </p>
      <p
        className={`${styles.p} ${
          props.isChosen ? styles.chosenP : styles.notChosenP
        } ${isDisabled ? styles.disabledText : null}`}
      >
        {props.date.getDate()}
      </p>
    </button>
  );
};

export default CalendarItem;
