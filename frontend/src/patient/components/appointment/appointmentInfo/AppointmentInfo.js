import React, { useState } from 'react';
import Calendar from '../calender/Calendar';

const AppointmentInfo = (props) => {
  const [chosenDate, setChosenDate] = useState();

  const chooseDay = (date) => {
    setChosenDate(date);
  };
  return <Calendar onChooseDay={chooseDay} chosenDate={chosenDate} />;
};

export default AppointmentInfo;
