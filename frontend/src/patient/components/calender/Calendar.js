import React, { useState } from 'react';

const Calendar = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  const currentDate = new Date();
  const [currentDateState, setCurrentDate] = useState(currentDate);

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

  return (
    <div>
      <h1>{currentYear}</h1>
      <button onClick={() => goToDesiredWeek(-1)}>Previous Week</button>
      <button onClick={() => goToDesiredWeek(1)}>Next Week</button>
      <table>
        <thead>
          <tr>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {days.map((_, index) => {
              let dayOfMonth = currentDateState.getDate() + index;
              let lastDayOfMonth = getLastDayOfDesiredMonth(
                currentDateState.getFullYear(),
                currentDateState.getMonth() + 1
              );
              if (dayOfMonth > lastDayOfMonth) {
                dayOfMonth -= lastDayOfMonth;
              }

              return <td key={dayOfMonth}>{dayOfMonth}</td>;
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
