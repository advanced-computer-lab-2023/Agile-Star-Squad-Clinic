import React from 'react';

import styles from './AppointmentTime.module.css';

const AppointmentTime = (props) => {
  const timeList = [
    ['9:00 am', '9:30 am', '10:00 am', '10:30 am'],
    ['11:00 am', '11:30 am', '12:00 pm', '12:30 pm'],
  ];
  return (
    <table className={styles.table}>
      {timeList.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((time, columnIndex) => (
            <button
              key={columnIndex}
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
