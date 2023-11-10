import React, { useState } from 'react';

import CalendarItem from '../calendarDay/CalendarItem';
import styles from './Calendar.module.css';

const Calendar = (props) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
  const currentDate = new Date();
  const [currentDateState, setCurrentDate] = useState(currentDate);

  const weekArrowButtonClickHandler = (sign) => {
    const nextWeek = new Date(currentDateState);
    nextWeek.setDate(currentDateState.getDate() + 7 * sign);
    setCurrentDate(nextWeek);
  };

  const getLastDayOfDesiredMonth = (year, month) => {
    const nextMonth = new Date(year, month, 0);
    return nextMonth.getDate();
  };

  const currentYear = currentDateState.getFullYear();
  const currentMonth = currentDateState.getMonth();

  const arrow = (className) => {
    return (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="14"
        viewBox="0 0 23 14"
        fill="none"
      >
        <path
          d="M1.59583 1.53345L11.9077 11.9807L22.2571 1.57064"
          stroke="black"
          stroke-opacity="0.6"
          stroke-width="2.04827"
        />
      </svg>
    );
  };

  return (
    <div>
      <h1>{currentYear}</h1>
      <h1>{currentMonth}</h1>
      <br />
      <div className={styles.calendar}>
        <button
          className={styles.arrowButton}
          onClick={() => weekArrowButtonClickHandler(-1)}
        >
          {arrow(styles.backwards)}
        </button>
        {days.map((dayOfWeek, index) => {
          let dayOfMonth = currentDateState.getDate() + index;
          let lastDayOfMonth = getLastDayOfDesiredMonth(
            currentDateState.getFullYear(),
            currentDateState.getMonth() + 1
          );
          let month = currentDateState.getMonth();
          let year = currentDateState.getFullYear();
          if (dayOfMonth > lastDayOfMonth) {
            dayOfMonth -= lastDayOfMonth;
            month++;
            if (month > 12 || month === 1) {
              year++;
            }
          }
          let date = new Date(year, month, dayOfMonth);
          return (
            <CalendarItem
              isChosen={
                props.chosenDate != null
                  ? props.chosenDate.getDate() === dayOfMonth ?? false
                  : false
              }
              onChooseDay={props.onChooseDay}
              dayOfWeek={dayOfWeek}
              date={date}
              isDisabled={false}
            />
          );
        })}
        <button
          className={styles.arrowButton}
          onClick={() => weekArrowButtonClickHandler(1)}
        >
          {arrow(styles.forwards)}
        </button>
      </div>
    </div>
  );
};

export default Calendar;
