import React from 'react';

import styles from './DoctorInfo.module.css';

const DoctorInfo = (props) => {
  return (
    <div>
      {props.svg}
      <p className={styles.number}>{props.number}</p>
      <p className={styles.description}>{props.description}</p>
    </div>
  );
};

export default DoctorInfo;
