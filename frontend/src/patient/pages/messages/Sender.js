import styles from './Messages.module.css';

const Sender = () => {
  return (
    <div className>
      <div className={styles.senderBox}>
        <div className={styles.senderText}>
          <p>Hi! I lost my prescription note. Could you rewrite it?</p>
        </div>
      </div>
    </div>
  );
};

export default Sender;
