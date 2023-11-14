import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Card from '../../components/bookAppointment/card/Card';
import BookImplementation from '../../components/bookAppointment/bookImplementation/BookImplementation';
import NavBar from '../../../shared/components/NavBar/NavBar';
import styles from './BookAppointment.module.css';

const arrow = (
  <svg
    className={styles.backArrow}
    xmlns="http://www.w3.org/2000/svg"
    width="23"
    height="14"
    viewBox="0 0 23 14"
    fill="none"
  >
    <path
      d="M1.59583 1.53345L11.9077 11.9807L22.2571 1.57064"
      stroke="black"
      strokeOpacity="0.6"
      strokeWidth="2.04827"
    />
  </svg>
);

const BookAppointment = (props) => {
  const location = useLocation();
  const doctor = location.state;
  const getUpcomingAppointments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/patients/${doctor._id}/doctorUpcomingAppointments`,
        { withCredentials: true }
      );
      setUpComingAppointments(response.data.data.appointments);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [upcomingAppointments, setUpComingAppointments] = useState();
  getUpcomingAppointments();
  const navigate = useNavigate();

  const backButtonClickHandler = () => {
    navigate('/patient/home');
  };
  return (
    <div style={{ height: '100vh' }}>
      <div className={styles.navBar}>
        <NavBar />
      </div>
      <div style={{ marginTop: '100px' }}>
        <button className={styles.button} onClick={backButtonClickHandler}>
          {arrow}
        </button>
        <div className={styles.card}>
          <Card doctor={doctor} />
        </div>
        <div className={styles.appointmentInfo}>
          <BookImplementation
            availableTimes={doctor.timeSlots}
            doctorId={doctor}
            upcomingAppointments={upcomingAppointments}
          />
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
