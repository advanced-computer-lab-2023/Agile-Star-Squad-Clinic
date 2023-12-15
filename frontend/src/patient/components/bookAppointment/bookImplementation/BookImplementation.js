import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Calendar from '../calender/Calendar';
import AppointmentTime from '../appointmentTime/AppointmentTime';
import styles from './BookImplementation.module.css';
import axios from 'axios';
import UserContext from '../../../../user-store/user-context';

const BookImplementation = (props) => {
  const navigate = useNavigate();

  const userCtx = useContext(UserContext);

  const [user, setUser] = useState();

  const getPatient = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/patients/${userCtx.userId}`,
        { withCredentials: true },
      );
      setUser(response.data.data.patient);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [chosenDate, setChosenDate] = useState();
  const [chosenTime, setChosenTime] = useState();
  const [selectedOption, setSelectedOption] = useState(userCtx.userId);
  const [familyMembers, setFamilyMembers] = useState([]);

  const getFamilyMembers = async () => {
    const members = await axios.get(
      `http://localhost:3000/patients/${userCtx.userId}/familyMembers`,
      { withCredentials: true },
    );
    setFamilyMembers(members.data.data.members);
  };

  useEffect(() => {
    getPatient();
    getFamilyMembers();
  }, []);

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

  let unavailableTimes = props.upcomingAppointments;
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

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const bookAppointmentHandler = async () => {
    const packageToUse = user.package;
    let patientName;
    let addAppointmentTo;
    if (selectedOption === userCtx.userId) {
      patientName = user.name;
      addAppointmentTo = userCtx.userId;
    } else {
      const member = familyMembers.find((member) => {
        return JSON.stringify(member._id) === JSON.stringify(selectedOption);
      });
      patientName = member.name;
      const familyMemberPatientAccount = member.memberPatientId;
      //  = await axios
      //   .get(
      //     `http://localhost:3000/patients/getByNationalId/${member.nationalId}`,
      //     { withCredentials: true }
      //   )
      //   .catch();
      if (familyMemberPatientAccount === undefined) {
        addAppointmentTo = userCtx.userId;
      } else {
        addAppointmentTo = familyMemberPatientAccount._id;
      }
    }
    const [hours, minutes] = chosenTime.split(':');
    const appointmentDate = new Date(chosenDate);
    appointmentDate.setHours(hours);
    appointmentDate.setMinutes(minutes);
    const dataToSend = {
      packageToUse,
      patientName,
      addAppointmentTo,
      doctor: props.doctor,
      dateOfAppointment: appointmentDate,
      timeOfAppointment: chosenTime,
    };
    navigate('/patient/checkout', { state: dataToSend });
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
            <option value={userCtx.userId}>Me</option>
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
        {chosenDate !== undefined && (
          <AppointmentTime
            availableTimes={removeDuplicatesFromArray(
              expandTimeRange(props.availableTimes[chosenDate.getDay()]),
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
        onClick={bookAppointmentHandler}
        disabled={chosenDate === undefined || chosenTime === undefined}
      >
        Book Appoinment
      </button>
    </div>
  );
};

export default BookImplementation;
