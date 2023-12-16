import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Calendar from './bookAppointment/calender/Calendar';
import AppointmentTime from './bookAppointment/appointmentTime/AppointmentTime';
import axios from 'axios';
import UserContext from '../../user-store/user-context';
import Modal from '../../shared/components/Modal/Modal';

import styles from './bookAppointment/bookImplementation/BookImplementation.module.css';

const RescheduleAppointmentModal = (props) => {
  const navigate = useNavigate();

  const userCtx = useContext(UserContext);

  const [user, setUser] = useState();
  const [doctor, setDoctor] = useState();
  const [upcomingAppointments, setUpComingAppointments] = useState();
  const [chosenDate, setChosenDate] = useState();
  const [chosenTime, setChosenTime] = useState();

  const getPatient = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/patients/${userCtx.userId}`,
        { withCredentials: true },
      );
      setUser(response.data.data.patient);
    } catch (error) {
      alert('get patient error');
      console.error('Error:', error);
    }
  };

  const getDoctor = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/doctors/${props.appointment.doctorId}`,
        { withCredentials: true },
      );
      setDoctor(response.data.data.doctor);
    } catch (error) {
      alert('get doctor error');
      console.error('Error:', error);
    }
  };

  const getUpcomingAppointments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/patients/${doctor._id}/doctorUpcomingAppointments`,
        { withCredentials: true },
      );
      setUpComingAppointments(response.data.data.appointments);
    } catch (error) {
      alert('get upcoming appointments error');
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getDoctor();
    getPatient();
  }, []);

  useEffect(() => {
    if (doctor !== undefined) getUpcomingAppointments();
  }, [doctor]);

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

  let unavailableTimes = upcomingAppointments;
  if (unavailableTimes !== undefined && chosenDate !== undefined) {
    unavailableTimes = unavailableTimes.filter(
      (app) =>
        new Date(app.dateOfAppointment).getFullYear() ===
          chosenDate.getFullYear() &&
        new Date(app.dateOfAppointment).getMonth() === chosenDate.getMonth() &&
        new Date(app.dateOfAppointment).getDate() === chosenDate.getDate(),
    );
    if (unavailableTimes !== undefined) {
      unavailableTimes = unavailableTimes.map((app) => {
        const timeString = new Date(app.dateOfAppointment)
          .toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
          .toLowerCase();
        return timeString;
      });
    }
  }

  let displayDate;
  if (chosenDate === undefined) {
    displayDate = 'please choose a date and time';
  } else if (chosenTime === undefined) {
    displayDate = 'please choose a time';
  } else {
    displayDate = `${dayOfWeek} ${getOrdinalSuffix(
      dayOfMonth,
    )} of ${monthOfYear} ${year} ${chosenTime}`;
  }

  const rescheduleAppointmentHandler = async () => {
    const packageToUse = user.package;
    let patientName;
    let addAppointmentTo;
    patientName = user.name;
    addAppointmentTo = userCtx.userId;
    const [hours, minutes] = chosenTime.split(':');
    const appointmentDate = new Date(chosenDate);
    appointmentDate.setHours(hours);
    appointmentDate.setMinutes(minutes);
    const dataToSend = {
      packageToUse,
      patientName,
      addAppointmentTo,
      doctor: doctor._id,
      patient: userCtx.userId,
      status: 'rescheduled',
      dateOfAppointment: appointmentDate,
      timeOfAppointment: chosenTime,
    };
    await axios.delete(
      `http://localhost:3000/patients/appointments/${props.appointment._id}`,
      { withCredentials: true },
    );
    await axios.post('http://localhost:3000/doctors/appointments', dataToSend, {
      withCredentials: true,
    });
    // props.onRescheduleAppointment();
    props.exit();
  };
  const expandTimeRange = (timeRanges) => {
    const expandedTimeRanges = [];

    timeRanges.forEach((timeRange) => {
      const { from, to } = timeRange;
      const startHour = parseInt(from.split(':')[0]);
      const endHour = parseInt(to.split(':')[0]);

      const expandedTimeRange = Array.from(
        { length: endHour - startHour },
        (_, index) => {
          const hour = startHour + index;
          return `${hour.toString().padStart(2, '0')}:00`;
        },
      );

      expandedTimeRanges.push(expandedTimeRange);
    });
    return expandedTimeRanges.flat(); // Use flat() to flatten the array of arrays
  };

  const removeDuplicatesFromArray = (array) => {
    const uniqueArray = [];
    const set = new Set();

    array.forEach((item) => {
      if (!set.has(item)) {
        set.add(item);
        uniqueArray.push(item);
      }
    });

    return uniqueArray;
  };

  return (
    <Modal exit={props.exit}>
      <div>
        <Calendar onChooseDate={chooseDate} chosenDate={chosenDate} />
        <div style={{ textAlign: 'start' }}>
          <p className={styles.text}>Available Time</p>
          {chosenDate !== undefined && (
            <AppointmentTime
              availableTimes={removeDuplicatesFromArray(
                expandTimeRange(doctor.timeSlots[chosenDate.getDay()]),
              )}
              unavailableTimes={unavailableTimes}
              onChooseTime={chooseTime}
              chosenTime={chosenTime}
              isDisabled={chosenDate === undefined}
            />
          )}
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
          onClick={rescheduleAppointmentHandler}
          disabled={chosenDate === undefined || chosenTime === undefined}
        >
          {props.buttonText}
        </button>
      </div>
    </Modal>
  );
};

export default RescheduleAppointmentModal;
