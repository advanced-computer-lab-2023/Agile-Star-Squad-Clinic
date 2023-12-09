import styles from './Messages.module.css';
import profilePic from './images/Rectangle1.png';

const ChatRoom = () => {
  return (
    <div>
      <button className={styles.chatRoom}>
        <img src={profilePic} alt="myPic" />
        <div className={styles.chatInfo}>
          <h6>Ahmed Lasheen</h6>
          <p className={styles.lastMessage}>
            Hi! I lost my prescription note. Could you rewrite it?
          </p>
        </div>
      </button>
    </div>
  );
};

export default ChatRoom;
