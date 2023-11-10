import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Card from '../../components/appointment/card/Card';
import BookAppointment from '../../components/appointment/bookAppointment/BookAppointment';
import NavBar from '../../../shared/components/NavBar/NavBar';
import styles from './Appointment.module.css';

const dummyDoctor = {
  _id: {
    $oid: '65270f436a48cd31d535b963',
  },
  username: 'derek',
  name: 'William Janus',
  email: 'derek@gmail.com',
  password: 'test1234',
  dateOfBirth: {
    $date: '2000-08-09T00:00:00.000Z',
  },
  hourlyRate: 700,
  affiliation: 'Shitty Wok',
  educationalBackground: 'PHD',
  speciality: 'Therapy',
  appointments: [
    {
      $oid: '65270f9d6a48cd31d535b965',
    },
    {
      $oid: '65270fac6a48cd31d535b96d',
    },
    {
      $oid: '652abeb5c7ba60367f827576',
    },
    {
      $oid: '652abf8708de3ef77f26ef6d',
    },
  ],
  patients: ['65270e13cfa9abe7a31a4d8a', '65270df9cfa9abe7a31a4d88'],
  __v: 5,
  dateOfCreation: {
    $date: '2000-08-09T00:00:00.000Z',
  },
  image:
    'https://www.giantbomb.com/a/uploads/square_small/17/174460/2642491-3639297626-6_23_.jpg',
  rating: 0,
};

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

const Appointment = (props) => {
  // alert(
  //   `https://localhost:3000/doctors/${dummyDoctor._id.$oid}/upComingAppointments`
  // );
  const getUpcomingAppointments = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/doctors/65270f436a48cd31d535b963/upcomingAppointments'
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
    <div>
      <NavBar />
      <button className={styles.button} onClick={backButtonClickHandler}>
        {arrow}
      </button>
      <div className={styles.card}>
        <Card doctor={dummyDoctor} />
      </div>
      <div className={styles.appointmentInfo}>
        <BookAppointment upcomingAppointments={upcomingAppointments} />
      </div>
    </div>
  );
};

export default Appointment;
