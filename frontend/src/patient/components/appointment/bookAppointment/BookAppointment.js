import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Calendar from '../calender/Calendar';
import AppointmentTime from '../appointmentTime/AppointmentTime';
import styles from './BookAppoinment.module.css';

const BookAppointment = (props) => {
  const navigate = useNavigate();

  const [chosenDate, setChosenDate] = useState();
  const [chosenTime, setChosenTime] = useState();

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

  const bookAppointmentHandler = () => {
    navigate('/patient/checkout');
  };

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

  return (
    <div>
      <p className={styles.text}>Appointment</p>
      <Calendar onChooseDate={chooseDate} chosenDate={chosenDate} />
      <p className={styles.text}>Available Time</p>
      <AppointmentTime
        unavailableTimes={unavailableTimes}
        onChooseTime={chooseTime}
        chosenTime={chosenTime}
        isDisabled={chosenDate === undefined}
      />
      <p className={styles.text} style={{ marginTop: '70px' }}>
        Date Chosen
      </p>
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
