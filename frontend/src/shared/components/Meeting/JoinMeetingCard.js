import React from 'react';
import { Link } from 'react-router-dom';

import styles from './JoinMeetingCard.module.css';

const JoinMeetingCard = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={props.imageUrl} alt={props.name} className={styles.avatar} />
        <p className={styles.name}>{props.name}</p>
        <p className={styles.specialty}>{props.specialty}</p>
      </div>
      <div className={styles.right}>
        <p className={styles.time}>{props.time}</p>
        {props.for && <p className={styles.for}>{props.for}</p>}
        {props.with && <p className={styles.for}>{props.with}</p>}
      </div>
      <Link to="/meeting">
        <button className={styles.joinBtn}>JOIN MEETING</button>
      </Link>
    </div>
  );
};

export default JoinMeetingCard;
