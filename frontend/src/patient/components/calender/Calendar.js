import React, { useState } from 'react';

import CalendarItem from '../CalendarDay/CalendarItem';
import './Calendar.css';

const Calendar = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
  const currentDate = new Date();
  const [currentDateState, setCurrentDate] = useState(currentDate);
  const [chosenDate, setChosenDate] = useState();

  const goToDesiredWeek = (sign) => {
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

  const chooseDay = (date) => {
    setChosenDate(date);
  };

  return (
    <div>
      <h1>{currentYear}</h1>
      <h1>{currentMonth}</h1>
      <button onClick={() => goToDesiredWeek(-1)}>Previous Week</button>
      <button onClick={() => goToDesiredWeek(1)}>Next Week</button>
      <br />
      <div className="calendar">
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
              class={
                chosenDate != null
                  ? chosenDate.getDate() === dayOfMonth
                    ? 'chosen'
                    : 'not-chosen'
                  : 'not-chosen'
              }
              onChooseDay={chooseDay}
              dayOfWeek={dayOfWeek}
              date={date}
              isDisabled={false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
