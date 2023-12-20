import ReactDOM from 'react-dom';
import React, { useState, useEffect, useContext } from 'react';
import Card from '../../shared/components/Card/Card';

import axios from 'axios';

import styles from '../pages/PatientDetails.module.css';
import RescheduleAppointmentModal from '../../patient/components/RescheduleAppointmentModal';

const RecentAppointment = (props) => {
  const [finalAppointments, setAppointments] = useState([]);
  const [finalFollowUps, setFollowUps] = useState([]);
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
        const today = new Date(); // Current date
        const lastMonth = new Date(); // Date from last month
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        setAppointments(
          appointments.filter(
            (appointment) =>
              appointment.doctorId === doctor.userId &&
              appointment.status === 'completed' &&
              (new Date(appointment.date) > lastMonth && // Ensure the appointment date is after lastMonth
      new Date(appointment.date) <= today )
          ),
        );
      });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchFollowUps = async () => {
    try {
      fetch(`http://localhost:3000/doctors/${doctor.userId}/`, {
        credentials: 'include',
      }).then(async (response) => {
        const json = await response.json();
        const myDoctor=await json.data.doctor;
        const followUps= myDoctor.followUps;
        console.log(followUps)
        const filteredFollowUps = [];
        for (let i = 0; i < followUps.length; i++) {
          
          if (followUps[i][0].data.data.patient === patient._id) {
            filteredFollowUps.push(followUps[i][0]);
          }
        }
        console.log(filteredFollowUps)
        setFollowUps(filteredFollowUps);
      //   setFollowUps(
      //     followUps.filter(
      //       (followUp) =>
      //       followUp.data.doctorId === doctor.userId &&
      //       followUp.status === 'completed' &&
      //         (new Date(appointment.date) > lastMonth && // Ensure the appointment date is after lastMonth
      // new Date(appointment.date) <= today )
      //     ),
      //   );
        // const appointments = await json.data.appointments;

        // console.log("hello123",prescriptions.filter(prescription => prescription.doctor === doctor.userId));
      //   const today = new Date(); // Current date
      //   const lastMonth = new Date(); // Date from last month
      //   lastMonth.setMonth(lastMonth.getMonth() - 1);

      //   setAppointments(
      //     appointments.filter(
      //       (appointment) =>
      //         appointment.doctorId === doctor.userId &&
      //         appointment.status === 'completed' &&
      //         (new Date(appointment.date) > lastMonth && // Ensure the appointment date is after lastMonth
      // new Date(appointment.date) <= today )
      //     ),
      //   );
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
    fetchFollowUps();
  }, []);

  const viewButtonHandler = (prescription) => {
    setChosenAppointment(prescription);

    setDetailsOn(true);
  };
  const rejectButtonHandler = (prescription) => {
    setChosenAppointment(prescription);

    setDetailsOn(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString(); // Adjust this to fit your desired date format
  };
    console.log("///",finalFollowUps);
  return (
    <React.Fragment>
      <Card className={styles.prescriptionDetails}>
        <div className={styles.prescriptionHeader}>
          <h3 className={styles.welcomeText} style={{ textAlign: 'center' }}>
            Appointments
          </h3>
        </div>
        <div className={styles.prescriptionList}>
          {finalFollowUps.length != 0 &&
            finalFollowUps.map((url, index) => {
              return (
                <>
                  <div className={styles.prescriptionItem}>
                    <p>
                      <strong>Appointment {index + 1} </strong>
                      {url && url[0]&& <>{url[0].data.data.patientName}</>}
                    </p>
                    <div>
                      <button
                        className={styles.patientButton}
                        onClick={() => viewButtonHandler(url)}
                        style={{ marginLeft: '200px' }}
                      >
                        Accept
                      </button>
                      <button
                        className={styles.patientButton}
                        onClick={() => rejectButtonHandler(url)}
                        style={{ marginLeft: '200px' }}
                      >
                        Reject
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
          buttonText={'Follow Up Appointment'}
          onRescheduleAppointment={submitPrescHandler}
        />
      )}
    </React.Fragment>
  );
};
export default RecentAppointment;
