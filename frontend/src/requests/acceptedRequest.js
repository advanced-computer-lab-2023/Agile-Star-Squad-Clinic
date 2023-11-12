import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Select from "react-select"
import classes from './requestsStyle.module.css';
import doctorImage from './051_Doctor 1.png';
import tick from './Medicine.png';
import logo from './logo.png';
import { DUMMY_USER } from '../shared/DummyUsers';


const AcceptedRequest = (props) => {
  const [isButtonPressed, setButtonPressed1] = useState(false);
  const [isButtonPressed2, setButtonPressed2] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [timeSlots, setTimeSlots] = useState([{ label: "Empty Slot" }]);

  const doctorId = DUMMY_USER._id;
  const handleButtonClick1 = () => {
    setButtonPressed1(true);
  }
  const handleButtonClick2 = () => {
    setButtonPressed2(true);
  }

  const slotSelectStyle = isButtonPressed2 ? classes.slotSelectStyle : "";

  const getDay = (day) => {
    switch (day) {
      case 0:
        return "Sunday"
      case 1:
        return "Monday"
      case 2:
        return "Tuesday"
      case 3:
        return "Wednesday"
      case 4:
        return "Thursday"
      case 5:
        return "Friday"
      case 6:
        return "Saturday"
      default:
        break;
    }
  }

  const timeOptions = [
    { value: "00:00", label: "12:00 AM" },
    { value: "01:00", label: "1:00 AM" },
    { value: "02:00", label: "2:00 AM" },
    { value: "03:00", label: "3:00 AM" },
    { value: "04:00", label: "4:00 AM" },
    { value: "05:00", label: "5:00 AM" },
    { value: "06:00", label: "6:00 AM" },
    { value: "07:00", label: "7:00 AM" },
    { value: "08:00", label: "8:00 AM" },
    { value: "09:00", label: "9:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "13:00", label: "1:00 PM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "15:00", label: "3:00 PM" },
    { value: "16:00", label: "4:00 PM" },
    { value: "17:00", label: "5:00 PM" },
    { value: "18:00", label: "6:00 PM" },
    { value: "19:00", label: "7:00 PM" },
    { value: "20:00", label: "8:00 PM" },
    { value: "21:00", label: "9:00 PM" },
    { value: "22:00", label: "10:00 PM" },
    { value: "23:00", label: "11:00 PM" },
  ];

  const handleTimeSlotAdd = () => {
    setTimeSlots(prevValue => {
      const newSlot = {
        day: selectedDay,
        from: fromTime.value,
        to: toTime.value,
        label: `${getDay(selectedDay).slice(0, 3)} ${fromTime.label} - ${toTime.label}`
      }
      prevValue[prevValue.length - 1] = newSlot;
      return [...prevValue, { label: "Empty Slot" }]
    });
  }

  const removeSlot = (removedSlot) => {
    setTimeSlots(prevValue => {
      const newSlots = prevValue.filter(slot => slot != removedSlot);
      return newSlots;
    })
  }

  const [fromTime, setFromTime] = useState(timeOptions[10]);
  const [toTime, setToTime] = useState(timeOptions[11]);

  const handleFromTimeSet = (option) => {
    if (option.value >= toTime.value) {
      const adjustedToTime = timeOptions[timeOptions.indexOf(option) + 1];
      setToTime(adjustedToTime);
    }
    setFromTime(option);
  }

  const handleToTimeSet = (option) => {
    if (option.value <= fromTime.value) {
      const adjustedFromTime = timeOptions[timeOptions.indexOf(option) - 1];
      setFromTime(adjustedFromTime);
    }
    setToTime(option);
  }

  const onSubmitSlots = () => {
    const allSlots = [];
    timeSlots.forEach(slot => {
      if (slot.day == null) return;
      const exists = allSlots.some(existingSlot => {
        return existingSlot.day === slot.day && existingSlot.from === slot.from && existingSlot.to === slot.to;
      })
      if (!exists) {
        allSlots.push(slot)
      }
    });

    const finalResults = [[], [], [], [], [], [], []];
    allSlots.forEach(slot => {
      finalResults[slot.day].push({ from: slot.from, to: slot.to });
    });
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({timeSlots: finalResults}),
    };

    fetch(`http://localhost:3000/doctors/${doctorId}/timeSlots`, requestOptions)
  }

  return (

    <body className={classes.background}>
      <div className='d-flex'>
        <div className={`${classes.mainBackground} col-5`}>
          <div className={classes.logo}>
            <img src={logo} alt="Clinic Logo" />
          </div>
          <img src={doctorImage} alt="Doctor Image" className={classes.doctorImage} />
        </div>

        <div className={`${classes.secondBackground} col-7`}>
          {
            <div className={`${classes.customText} ${slotSelectStyle}`}>
              {!isButtonPressed && (
                <>
                  <p className={classes.p1}>ACCESS REQUEST APPROVED</p>
                  <p className={classes.p2}>Access Authorized</p>
                  <img src={tick} alt="BIG TICK" />
                  <div>
                    <button className={classes.button} onClick={handleButtonClick1}>NEXT</button>
                  </div>
                </>
              )}
              {isButtonPressed && (
                <>
                  {!isButtonPressed2 && (
                    <>
                      <div className={classes.terms}>Terms & Conditions</div>
                      <div className={classes.agreement}>Your agreement</div>
                      <div className={classes.container}>Last Revised: December 16, 2013
                        Welcome to www.lorem-ipsum.info. This site is provided as a service to our visitors and may be used for informational purposes only. Because the Terms and Conditions contain legal obligations, please read them carefully.
                        1. YOUR AGREEMENT
                        By using this Site, you agree to be bound by, and to comply with, these Terms and Conditions. If you do not agree to these Terms and Conditions, please do not use this site.
                        PLEASE NOTE: We reserve the right, at our sole discretion, to change, modify or otherwise alter these Terms and Conditions at any time. Unless otherwise indicated, amendments will become effective immediately. Please review these Terms and Conditions periodically. Your continued use of the Site following the posting of changes and/or modifications will constitute your acceptance of the revised Terms and Conditions and the reasonableness of these standards for notice of changes. For your information, this page was last updated as of the date at the top of these terms and conditions.
                        2. PRIVACY
                        Please review our Privacy Policy, which also governs your visit to this Site, to understandation provided to or gathered by us with respect to such use.
                      </div>
                      <div className={classes.buttonsDiv}>
                        <button className={classes.cancelButton} >Cancel</button>
                        <button className={classes.agreeButton} onClick={handleButtonClick2}>Agree</button>
                      </div>
                    </>
                  )}
                  {isButtonPressed2 && (
                    <div className='d-flex h-100'>
                      <div className='col-2'></div>
                      <div className={`col-5 ${classes.timeSlotLeft}`}>
                        <h1 className={classes.timeslots}>Time Slots</h1>
                        <div className={classes.slotsSubtitle}>Select your available time slots</div>
                        <div className={classes.containerleft}>
                          <div className={classes.slotHeader}>Select date and time</div>
                          <div className={classes.dateTimeContainer}>
                            <div className={`col-8 ${classes.daySelect}`}>
                              <div className={classes.daySelectHeader}>{getDay(selectedDay)}</div>
                              <div className={`${classes.dayText} ${selectedDay == 0 ? classes.selectedDayText : ""}`} onClick={() => { setSelectedDay(0) }}>Sunday</div>
                              <div className={`${classes.dayText} ${selectedDay == 1 ? classes.selectedDayText : ""}`} onClick={() => { setSelectedDay(1) }}>Monday</div>
                              <div className={`${classes.dayText} ${selectedDay == 2 ? classes.selectedDayText : ""}`} onClick={() => { setSelectedDay(2) }}>Tuesday</div>
                              <div className={`${classes.dayText} ${selectedDay == 3 ? classes.selectedDayText : ""}`} onClick={() => { setSelectedDay(3) }}>Wednesday</div>
                              <div className={`${classes.dayText} ${selectedDay == 4 ? classes.selectedDayText : ""}`} onClick={() => { setSelectedDay(4) }}>Thursday</div>
                              <div className={`${classes.dayText} ${selectedDay == 5 ? classes.selectedDayText : ""}`} onClick={() => { setSelectedDay(5) }}>Friday</div>
                              <div className={`${classes.dayText} ${selectedDay == 6 ? classes.selectedDayText : ""} border-0`} onClick={() => { setSelectedDay(6) }}>Saturday</div>
                            </div>
                            <div className={`col-4 ${classes.timeSelect}`}>
                              <div className={classes.timeContainer}>
                                <p>From</p>
                                <Select
                                  options={timeOptions.slice(0, -1)}
                                  styles={customStyles}
                                  value={fromTime}
                                  isSearchable={false}
                                  onChange={handleFromTimeSet}
                                />
                              </div>
                              <div className={classes.timeContainer}>
                                <p>To</p>
                                <Select
                                  options={timeOptions.slice(1)}
                                  styles={customStyles}
                                  value={toTime}
                                  isSearchable={false}
                                  onChange={handleToTimeSet}
                                />
                              </div>
                            </div>
                          </div>
                          <div className={classes.addButton} onClick={handleTimeSlotAdd}>Add</div>
                        </div>
                      </div>
                      <div className='col-1'></div>
                      <div className={`col-3 ${classes.slotSection}`}>
                        <button className={classes.slotSubmit} onClick={onSubmitSlots}>Submit</button>
                        <div className={classes.rightContainer}>
                          {timeSlots.map((slot) => {
                            return <div className={classes.addedSlot}>
                              <div onClick={() => removeSlot(slot)}>{slot.day != null ? "-" : ""}</div>
                              <div>{slot.label}</div>
                            </div>
                          })}
                        </div>
                      </div>
                      <div className='col-1'></div>
                      {/* <h1 className={classes.timeslots}>Time Slots</h1>
                      <div className={classes.agreement}>Select your available time slots</div>
                      <div className={classes.twoContainers}>
                        <div className={classes.containerRight}></div>
                      </div> */}
                    </div>
                  )}
                </>
              )}
            </div>


          }

        </div>
      </div>
    </body>







  )
}
export default AcceptedRequest;


const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'white',
    border: 'none',
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.09)",
    borderRadius: "17px",
    textAlign: 'start'
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#193842"
  }),
  indicatorSeparator: () => ({}),
  menu: (provided) => ({
    ...provided,
    borderRadius: '20px',
  }),
  option: (provided, state) => ({
    ...provided,
    borderRadius: '14px',
    fontSize: '14px',
    fontWeight: state.isFocused ? "500" : "400",
    color: state.isFocused ? "black" : "#666666",
    textAlign: "left",
    backgroundColor: "transparent"
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: '12px',
    fontWeight: "600",
    color: "#193842"
  }),
  valueContainer: (provided) => ({
    ...provided,
    backgroundColor: "transparent"
  }),
  menuList: (base) => ({
    ...base,

    "::-webkit-scrollbar": {
      width: "3px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "transparent"
    },
    "::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: '3px',
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555"
    }
  })
};