import styles from './Messages.module.css';

const Sender = (props) => {
  return (
    <div className>
      <div className={styles.senderBox}>
        <div className={styles.senderText}>
          <p>{props.msg}</p>
        </div>
      </div>
      <div className={`${styles.timestamp} ms-2 mt-1 text-start`}>{props.timestamp}</div>
    </div>
  );
};

export default Sender;
