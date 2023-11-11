import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Calendar from '../calender/Calendar';
import AppointmentTime from '../appointmentTime/AppointmentTime';
import styles from './BookAppoinment.module.css';
import axios from 'axios';

const BookAppointment = (props) => {
  const navigate = useNavigate();

  const dummyDummyUser = {
    _id: {
      $oid: '65270df9cfa9abe7a31a4d88',
    },
    username: 'mariam1234',
    name: 'mariam',
    email: 'mariam@gmail.com',
    password: 'test1234',
    dateOfBirth: {
      $date: '2001-05-05T00:00:00.000Z',
    },
    gender: 'male',
    mobileNumber: '12986575676',
    emergencyContact: {
      fullName: 'ahmed',
      phoneNumber: '12744784',
    },
    prescription: [
      {
        $oid: '65215f72fc0fccb3a2b49633',
      },
      {
        $oid: '652161250d517c8b2484dbf9',
      },
    ],
    familyMembers: [
      {
        $oid: '65294322dc8e607dd51e8753',
      },
      {
        $oid: '6529434b777d3bdb73d40914',
      },
      {
        $oid: '65294533719784c8d8c742c5',
      },
      {
        $oid: '652aadad17e30cdff35a3666',
      },
      {
        $oid: '652ad7e617e30cdff35a373f',
      },
      {
        $oid: '652ae63f13660e383accda46',
      },
      {
        $oid: '652ae65d13660e383accda4f',
      },
      {
        $oid: '652ae99d0d76955ea353fc64',
      },
      {
        $oid: '652b4645677e678137712f8b',
      },
      {
        $oid: '652d088e263d88f43ea92b7d',
      },
    ],
    appointments: [
      {
        $oid: '65270f9d6a48cd31d535b965',
      },
      {
        $oid: '652abeb5c7ba60367f827576',
      },
      {
        $oid: '652abf8708de3ef77f26ef6d',
      },
    ],
    __v: 5,
    package: {
      $oid: '652b334947959480072bcd09',
    },
    medicalRecord: 'MR',
  };

  const [dummyUser, setDummyUser] = useState(dummyDummyUser);

  const getPatient = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/patients/65270df9cfa9abe7a31a4d88'
      );
      setDummyUser(response.data.data.patient);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  getPatient();

  const [chosenDate, setChosenDate] = useState();
  const [chosenTime, setChosenTime] = useState();
  const [selectedOption, setSelectedOption] = useState(dummyUser._id.$oid);
  const [familyMembers, setFamilyMembers] = useState([]);

  const getFamilyMembers = async () => {
    const patientId = '65270df9cfa9abe7a31a4d88';
    const members = await axios.get(
      `http://localhost:3000/patients/${patientId}/familyMembers`
    );
    setFamilyMembers(members.data.data.members);
  };

  getFamilyMembers();

  const chooseDate = (date) => {
    setChosenTime();
    setChosenDate(date);
  };

  const chooseTime = (time) => {
    setChosenTime(time);
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  let dayOfWeek;
  let dayOfMonth;
  let monthOfYear;
  let year;

  if (chosenDate !== undefined && chosenTime !== undefined) {
    dayOfWeek = daysOfWeek[chosenDate.getDay()];
    dayOfMonth = chosenDate.getDate();
    monthOfYear = monthsOfYear[chosenDate.getMonth()];
    year = chosenDate.getFullYear();
  }

  const getOrdinalSuffix = (number) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = number % 100;
    return number + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  };

  const options = { hour: 'numeric', minute: 'numeric', hour12: true };

  let unavailableTimes = [];

  if (props.upcomingAppointments !== undefined && chosenDate !== undefined) {
    unavailableTimes = props.upcomingAppointments.filter(
      (app) =>
        new Date(app.dateOfAppointment).getFullYear() ===
          chosenDate.getFullYear() &&
        new Date(app.dateOfAppointment).getMonth() === chosenDate.getMonth() &&
        new Date(app.dateOfAppointment).getDate() === chosenDate.getDate()
    );
    unavailableTimes = unavailableTimes.map((app) =>
      new Date(app.dateOfAppointment)
        .toLocaleTimeString(undefined, options)
        .toLowerCase()
    );
  }

  let displayDate;
  if (chosenDate === undefined) {
    displayDate = 'please choose a date and time';
  } else if (chosenTime === undefined) {
    displayDate = 'please choose a time';
  } else {
    displayDate = `${dayOfWeek} ${getOrdinalSuffix(
      dayOfMonth
    )} of ${monthOfYear} ${year} ${chosenTime}`;
  }

  const handleDropdownChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
  };

  const bookAppointmentHandler = async () => {
    const packageToUse = dummyUser.package;
    let patientName;
    let addAppointmentTo;
    if (selectedOption === dummyUser._id) {
      patientName = dummyUser.name;
      addAppointmentTo = dummyUser._id;
    } else {
      const member = familyMembers.find((member) => {
        return JSON.stringify(member._id) === JSON.stringify(selectedOption);
      });
      patientName = member.name;
      const familyMemberPatientAccount = await axios
        .get(
          `http://localhost:3000/patients/getByNationalId/${member.nationalId}`
        )
        .catch();
      if (familyMemberPatientAccount) {
        addAppointmentTo = dummyUser._id;
      } else {
        addAppointmentTo = familyMemberPatientAccount._id;
      }
    }
    const dataToSend = {
      packageToUse,
      patientName,
      addAppointmentTo,
    };
    navigate('/patient/home', { state: dataToSend });
  };

  return (
    <div>
      <div style={{ textAlign: 'start' }}>
        <p className={styles.text}>Appointment for</p>
        <div className={styles.dropDown}>
          <select
            className={`${styles.text} ${styles.dropDown}`}
            id="myDropdown"
            value={selectedOption.name}
            onChange={handleDropdownChange}
          >
            <option value={dummyUser._id}>Me</option>
            {familyMembers !== undefined &&
              familyMembers.map((member) => (
                <option value={member._id}>{member.name}</option>
              ))}
          </select>
        </div>
      </div>
      <Calendar onChooseDate={chooseDate} chosenDate={chosenDate} />
      <div style={{ textAlign: 'start' }}>
        <p className={styles.text}>Available Time</p>
        <AppointmentTime
          unavailableTimes={unavailableTimes}
          onChooseTime={chooseTime}
          chosenTime={chosenTime}
          isDisabled={chosenDate === undefined}
        />
        <p className={styles.text} style={{ marginTop: '30px' }}>
          Date Chosen
        </p>
      </div>
      <p
        className={
          chosenDate === undefined || chosenTime === undefined
            ? styles.missing
            : null
        }
      >
        {displayDate}
      </p>
      <button
        className={styles.bookButton}
        onClick={bookAppointmentHandler}
        disabled={chosenDate === undefined || chosenTime === undefined}
      >
        Book Appoinment
      </button>
    </div>
  );
};

export default BookAppointment;
