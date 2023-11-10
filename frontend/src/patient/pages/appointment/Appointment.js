import React from 'react';

import Card from '../../components/appointment/card/Card';
import AppointmentInfo from '../../components/appointment/appointmentInfo/AppointmentInfo';
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

const Appointment = (props) => {
  return (
    <div>
      <NavBar />
      <div className={styles.card}>
        <Card
          // doctor={{
          //   name: 'William Janus',
          //   affiliation: 'Shitty Wok',
          //   speciality: 'Therapy',
          //   educationalBackground: 'PHD',
          //   image:
          //     'https://www.giantbomb.com/a/uploads/square_small/17/174460/2642491-3639297626-6_23_.jpg',
          // }}
          doctor={dummyDoctor}
        />
      </div>
      <div className={styles.appointmentInfo}>
        <AppointmentInfo />
      </div>
    </div>
  );
};

export default Appointment;
