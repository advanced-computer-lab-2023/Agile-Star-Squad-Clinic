import React from 'react';

import Card from '../../components/card/Card';
import AppointmentInfo from '../../components/appointmentInfo/AppointmentInfo';
import './Appointment.css';

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
      <div className="card">
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
      <div className="appointment-info">
        <AppointmentInfo />
      </div>
    </div>
  );
};

export default Appointment;
