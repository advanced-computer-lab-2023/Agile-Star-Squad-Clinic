import styles from './Messages.module.css';

const Receiver = (props) => {
  return (
    <div className={styles.receiverBox}>
      <div className={styles.receiverText}>
        <p>
          {props.msg}
        </p>
      </div>
    </div>
  );
};

export default Receiver;
