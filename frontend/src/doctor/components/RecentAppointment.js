import ReactDOM from 'react-dom';
import React, { useState, useEffect, useContext } from 'react';
import Card from '../../shared/components/Card/Card';

import axios from 'axios';

import styles from '../pages/PatientDetails.module.css';
import RescheduleAppointmentModal from '../../patient/components/RescheduleAppointmentModal';

const RecentAppointment = (props) => {
  const [finalAppointments, setAppointments] = useState([]);
  const [detailsOn, setDetailsOn] = useState(false);
  const [addNewOn, setaddNewOn] = useState(false);
  const [editOn, setEditOn] = useState(false);
  const [chosenAppointment, setChosenAppointment] = useState(null);
  const patient = props.patient;
  const doctor = props.doctor;
  const fetchAppointments = async () => {
    try {
      fetch(`http://localhost:3000/patients/${patient._id}/appointments`, {
        credentials: 'include',
      }).then(async (response) => {
        const json = await response.json();
        const appointments = await json.data.appointments;
       
        // console.log("hello123",prescriptions.filter(prescription => prescription.doctor === doctor.userId));

        setAppointments(
            appointments.filter(
              (appointment) => (appointment.doctorId === doctor.userId && appointment.status ==="completed" ),
            ),
          );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const submitPrescHandler = (newPrescription) => {
    //  fetchPrescriptions();
    setAppointments((prev) => {
      return [...prev, newPrescription];
    });
  };
  const submitEditPrescHandler = (editedPrescription) => {
    const updatedPrescriptions = finalAppointments.map((prescription) =>
      prescription._id === editedPrescription._id
        ? editedPrescription
        : prescription,
    );
    setAppointments(updatedPrescriptions);
  };
  useEffect(() => {
    fetchAppointments();
  }, []);


  const viewButtonHandler = (prescription) => {
    setChosenAppointment(prescription);

    setDetailsOn(true);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString(); // Adjust this to fit your desired date format
  };
//   console.log(finalAppointments);
  return (
    <React.Fragment>
      <Card className={styles.prescriptionDetails}>
        <div className={styles.prescriptionHeader}>
          <h3 className={styles.welcomeText} style={{ textAlign: 'center' }}>
            Appointments
          </h3>
          
        </div>
        <div className={styles.prescriptionList}>
          {finalAppointments.length != 0 &&
            finalAppointments.map((url, index) => {
              return (
                <>
                  <div className={styles.prescriptionItem}>
                    <p>
                      <strong>Appointment {index + 1} </strong>
                      <br /> {formatDate(url.date)}
                    </p>
                    <div>
                      
                      <button
                        className={styles.patientButton}
                        onClick={() => viewButtonHandler(url)}
                        style={{ marginLeft: '200px' }}
                      >
                        Follow Up
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </Card>
      {detailsOn && chosenAppointment && (
        <RescheduleAppointmentModal
        exit={() => setDetailsOn(false)}
        appointment={chosenAppointment}
        buttonText={"Follow Up Appointment"}
        onRescheduleAppointment={submitPrescHandler}
      />
      )}
      
    </React.Fragment>
  );
};
export default RecentAppointment;
