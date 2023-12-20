import ReactDOM from 'react-dom';
import React from 'react';
import Modal from '../../shared/components/Modal/Modal';
import styles from './PrescriptionDetails.module.css';

const PrescriptionDetails = (props) => {
  const onDelete = () => {
   
    props.exit();
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString(); // Adjust this to fit your desired date format
  };
  const getPrescBody = () => {
    return (
      <React.Fragment>
        {/* <div>
          <span>
            <h4>Prescribing Doctor</h4>
          </span>
          <span>{props.data["doctor"]}</span>
        </div> */}
        <div className={styles.prescriptionDetails}>
          <div className={styles.detail}>
            <span>
              <h4>Details</h4>
            </span>
            <span>{props.data['body']}</span>
          </div>
          <div className={styles.detail}>
            <span>
              <h4>Date of Prescription</h4>
            </span>
            <span>{formatDate(props.data['dateOfCreation'])}</span>
          </div>
          <div className={styles.detail}>
            <span>
              <h4>Status</h4>
            </span>
            <span>{props.data['status']}</span>
          </div>
          <div className={styles.detail}>
            <span>
              <h4>Prescribed Medications: </h4>
            </span>
            <table className={styles.prescriptionTable}>
            <thead>
      <tr>
        <th>Name</th>
        <th>Dosage</th>
        <th>Frequency</th>
        
      </tr>
    </thead>
    <tbody>
              {props.data['items'].map((item, index) => (
                <tr key={index}>
                 <td>{item.name}</td>
          <td>{item.dosage}</td>
          <td>{item.frequency}</td>
                </tr>
              ))}</tbody>
           </table>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return ReactDOM.createPortal(
    <Modal exit={props.exit}>
      {getPrescBody()}
      <ActionButtons onDownload={props.onDownload} onDelete={onDelete} />
    </Modal>,
    document.getElementById('backdrop-root'),
  );
};

const ActionButtons = (props) => {
  return <div className="d-flex justify-content-end mt-5">
    <button
        onClick={props.onDownload}
        className={`${styles.mainButton} me-3`}
        
      >
        Download PDF
      </button>
    <button
        onClick={props.onDelete}
        className={styles.mainButton}
        
      >
        Close
      </button>
  </div>;
};

export default PrescriptionDetails;
