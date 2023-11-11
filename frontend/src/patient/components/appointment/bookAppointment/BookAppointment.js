import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Calendar from '../calender/Calendar';
import AppointmentTime from '../appointmentTime/AppointmentTime';
import styles from './BookAppoinment.module.css';
import axios from 'axios';

const BookAppointment = (props) => {
  const navigate = useNavigate();

  const [chosenDate, setChosenDate] = useState();
  const [chosenTime, setChosenTime] = useState();
  const [selectedOption, setSelectedOption] = useState('myself');
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
    setSelectedOption(event.target.value);
  };

  // const bookAppointmentHandler = () => {
  //   navigate('/patient/checkout');
  // };

  return (
    <div>
      <div style={{ textAlign: 'start' }}>
        <p className={styles.text}>Appointment for</p>
        <div className={styles.dropDown}>
          <select
            className={`${styles.text} ${styles.dropDown}`}
            id="myDropdown"
            value={selectedOption}
            onChange={handleDropdownChange}
          >
            <option value="me">Me</option>
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
      <Link to={{ pathname: '/patient/checkout', state: {} }}>
        <button
          className={styles.bookButton}
          // onClick={bookAppointmentHandler}
          disabled={chosenDate === undefined || chosenTime === undefined}
        >
          Book Appoinment
        </button>
      </Link>
    </div>
  );
};

export default BookAppointment;
