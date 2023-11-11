import React from 'react';

import styles from './DoctorBackground.module.css';

const DoctorBackground = (props) => {
  return (
    <div>
      <p className={styles.description}>{props.description}</p>
      <p className={styles.attribute}>{props.attribute}</p>
    </div>
  );
};

export default DoctorBackground;
