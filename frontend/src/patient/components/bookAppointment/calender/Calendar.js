import React, { useState } from 'react';

import CalendarItem from '../calendarItem/CalendarItem';
import styles from './Calendar.module.css';

const Calendar = (props) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
  const [currentDate, setCurrentDate] = useState(new Date());

  // Check if the current day is Sunday (0 is Sunday)
  if (currentDate.getDay() === 0) {
    // Do nothing, as it's already Sunday
  } else if (currentDate.getDay() === 5 || currentDate.getDay() === 6) {
    // Calculate the difference in days between the current day and the next Sunday
    const daysUntilNextSunday = 7 - currentDate.getDay();

    // Set the date to the next Sunday
    const nextSunday = new Date(currentDate);
    nextSunday.setDate(currentDate.getDate() + daysUntilNextSunday);

    // Update the state with the adjusted date
    setCurrentDate(nextSunday);
  } else {
    // Calculate the difference in days between the current day and the previous Sunday
    const daysUntilPreviousSunday = currentDate.getDay();

    // Set the date to the previous Sunday
    const previousSunday = new Date(currentDate);
    previousSunday.setDate(currentDate.getDate() - daysUntilPreviousSunday);

    // Update the state with the adjusted date
    setCurrentDate(previousSunday);
  }

  const weekArrowButtonClickHandler = (sign) => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7 * sign);
    setCurrentDate(nextWeek);
  };

  const getLastDayOfDesiredMonth = (year, month) => {
    const nextMonth = new Date(year, month, 0);
    return nextMonth.getDate();
  };

  const monthsOfYear = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const currentYear = currentDate.getFullYear();
  const currentMonth = monthsOfYear[currentDate.getMonth()];

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
      <p className={styles.month}>{currentMonth}</p>
      <p className={styles.year}>{currentYear}</p>
      <div className={styles.calendar}>
        <button
          className={styles.arrowButton}
          onClick={() => weekArrowButtonClickHandler(-1)}
        >
          {arrow(styles.backwards)}
        </button>
        {days.map((dayOfWeek, index) => {
          let dayOfMonth = currentDate.getDate() + index;
          let lastDayOfMonth = getLastDayOfDesiredMonth(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1
          );
          let month = currentDate.getMonth();
          let year = currentDate.getFullYear();
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
              onChooseDate={props.onChooseDate}
              dayOfWeek={dayOfWeek}
              date={date}
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
