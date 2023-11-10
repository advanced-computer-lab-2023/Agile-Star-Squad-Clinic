import React from 'react';

import styles from './AppointmentTime.module.css';

const AppointmentTime = (props) => {
  const timeList = [
    ['9:00am', '9:30am', '10:00am', '10:30am'],
    ['11:00am', '11:30am', '12:00pm', '12:30pm'],
  ];
  return (
    <table className={styles.table}>
      {timeList.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((time, columnIndex) => (
            <button
              disabled={
                props.isDisabled || props.unavailableTimes.includes(time)
              }
              className={styles.button}
              onClick={() => props.onChooseTime(time)}
            >
              <th
                className={`${styles.timeItem} ${
                  props.chosenTime === time ? styles.chosenCell : null
                }`}
                key={columnIndex}
              >
                {time}
              </th>
            </button>
          ))}
        </tr>
      ))}
    </table>
  );
};

export default AppointmentTime;
