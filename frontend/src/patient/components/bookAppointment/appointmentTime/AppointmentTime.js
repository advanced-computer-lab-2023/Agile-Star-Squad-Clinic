import React from 'react';

import styles from './AppointmentTime.module.css';

const AppointmentTime = (props) => {
  const availableTimes = props.availableTimes;
  function convertTo12HourFormat(time24) {
    const [hour, minute] = time24.split(':');
    const hour12 = (hour % 12 || 12).toString(); // Convert 0 to 12
    const period = hour < 12 ? 'AM' : 'PM';
    return `${hour12}:${minute} ${period}`;
  }
  return (
    <table className={styles.table}>
      {availableTimes.map((time, index) => (
        <tc key={time}>
          <button
            key={time}
            disabled={props.isDisabled || props.unavailableTimes.includes(time)}
            className={styles.button}
            onClick={() => props.onChooseTime(time)}
          >
            <th
              className={`${styles.timeItem} ${
                props.chosenTime === time ? styles.chosenCell : null
              }`}
              key={time}
            >
              {convertTo12HourFormat(time)}
            </th>
          </button>
        </tc>
      ))}
    </table>
  );
};

export default AppointmentTime;
