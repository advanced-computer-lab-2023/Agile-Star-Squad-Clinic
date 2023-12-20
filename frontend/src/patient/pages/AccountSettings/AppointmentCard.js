import { useEffect, useState } from 'react';
import { SideCard } from './Account';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Select from 'react-select';
import classes from './AppointmentCard.module.css';
import calendarImg from '../../../assets/patientAccount/calendar.png';
import closeImg from '../../../assets/patientAccount/close.png';
import { useNavigate } from 'react-router-dom';
import RescheduleAppointmentModal from '../../components/RescheduleAppointmentModal';
import axios from 'axios';

const AppointmentsCard = (props) => {
  const navigate = useNavigate();

  const [tab, setTab] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [pickedDate, setPickedDate] = useState(null);
  const [pickedTime, setPickedTime] = useState(timeOptions[0]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [chosenApp, setChosenApp] = useState(null);
  const [modalText, setModalText] = useState('');

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setAllAppointments(
      props.appointments.map((app) => {
        const status =
          app.status.charAt(0).toUpperCase() + app.status.substring(1);
        // console.log("heyyy",app);
        return {
          _id: app._id,
          doctorId: app.doctorId,
          doctorName: app.doctorName,
          status,
          date: app.date,
          category: app.category,
        };
      }),
    );
  }, [props.appointments]);

  useEffect(() => {
    let tabText;
    switch (tab) {
      case 0:
        tabText = 'Upcoming';
        break;
      case 1:
        tabText = 'Past';
        break;
      case 2:
        tabText = 'Cancelled';
        break;
    }
    // console.log("hihihih",allAppointments)
    let newAppointments = allAppointments.filter(
      (app) =>
      app.status == tabText || (tab == 0 && app.status == 'Rescheduled') || (tab == 1 && app.status=='Completed'),
    );
    if (pickedDate != null) {
      newAppointments = newAppointments.filter((app) => {
        const appDate = new Date(app.date);
        let selectedDate = new Date(pickedDate);
        if (pickedTime.value) {
          const [hours, minutes] = pickedTime.value.split(':').map(Number);
          selectedDate.setHours(hours, minutes);
        } else {
          selectedDate.setHours(0, 0);
          appDate.setHours(0, 0);
        }
        return appDate.getTime() == selectedDate.getTime();
      });
    }
    
    setAppointments(newAppointments);
  }, [tab, allAppointments]);

  useEffect(() => {
    let newAppointments = appsByTab();
    if (pickedDate != null) {
      newAppointments = newAppointments.filter((app) => {
        const appDate = new Date(app.date);
        let selectedDate = new Date(pickedDate);
        if (pickedTime.value != null) {
          const [hours, minutes] = pickedTime.value.split(':').map(Number);
          selectedDate.setHours(hours, minutes);
        } else {
          selectedDate.setHours(0, 0);
          appDate.setHours(0, 0);
        }
        return appDate.getTime() == selectedDate.getTime();
      });
    }
    setAppointments(newAppointments);
  }, [pickedDate, pickedTime]);

  const appsByTab = () => {
    let tabText;
    switch (tab) {
      case 0:
        tabText = 'Upcoming';
        break;
      case 1:
        tabText = 'Past';
        break;
      case 2:
        tabText = 'Cancelled';
        break;
    }
    return allAppointments.filter(
      (app) =>
      app.status == tabText || (tab == 0 && app.status == 'Rescheduled')||(tab == 1 && app.status=='Completed'),

    );
  };

  const getTabStyle = (index) => {
    if (index == tab) {
      return `${classes.tabText} ${classes.activeTab}`;
    }
    return classes.tabText;
  };

  const getStatusBadge = (status) => {
    let backgroundColor, color;
    switch (status) {
      case 'Cancelled':
        backgroundColor = '#FDEBEC';
        color = '#ED3443';
        break;
      case 'Upcoming':
        backgroundColor = '#FCF4E6';
        color = '#E59500';
        break;
      default:
        backgroundColor = '#E8F6FD';
        color = '#96B7C7';
        break;
    }
    return (
      <span
        className="ms-1 px-2 py-1"
        height={20}
        style={{ borderRadius: '6px', backgroundColor, color }}
      >
        {status}
      </span>
    );
  };

  const formatDate = (date) => {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }).format(date);
    return formattedDate;
  };

  const formatDateTime = (dateTime) => {
    dateTime = new Date(dateTime);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }).format(dateTime);

    const time = dateTime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    return `${formattedDate} | ${time}`;
  };

  const onRescheduleAppointment = (newAppointment) => {
    //update the front end
    console.log(newAppointment)
  };

  const getButtons = (app) => {
    const onclick = () => {
      if (tab != 0 && tab != 1) {
        navigate('/patient/appointment/book');
      } else {
        if (tab == 0) setModalText('Reschedule Appointment');
        else setModalText('Follow Up Appointment');
        setChosenApp(app);
        setShowModal(true);
      }
    };

    const cancelBookingHandler = async () => {
      await axios.delete(
        `http://localhost:3000/patients/appointments/${app._id}`,
        { withCredentials: true },
      );
      //update the front end
    };

    return (
      <div className="d-flex justify-content-between">
          <div onClick={onclick} className={classes.rescheduleButton + ' me-2 py-2'}>
            {tab == 0 ? 'Reschedule' : tab == 1 ? 'Follow Up' : 'Book Again'}
          </div>
        {tab == 0 && (
            <div onClick={cancelBookingHandler} className={classes.cancelButton + ' ms-2 py-2'}>
              Cancel Booking
            </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {showModal && (
        <RescheduleAppointmentModal
          exit={() => setShowModal(false)}
          appointment={chosenApp}
          buttonText={modalText}
          onRescheduleAppointment={onRescheduleAppointment}
        />
      )}
      <SideCard>
        <div className="d-flex position-relative justify-content-between align-items-center">
          <div className={classes.sideCardTitle}>My Appointments</div>
          <div className={classes.dateSelection}>
            {pickedDate != null && (
              <span className="d-flex align-items-center me-3">
                {formatDate(pickedDate)}, {pickedTime.label}
                <img
                  className="ms-2"
                  onClick={() => setPickedDate(null)}
                  height={12}
                  src={closeImg}
                />
              </span>
            )}
            <img
              className={classes.iconButton}
              onClick={() => {
                setShowCalendar((val) => !val);
              }}
              src={calendarImg}
            />
          </div>
          {showCalendar && (
            <div className={classes.calendarContainer}>
              <Calendar
                className={classes.calendar}
                value={pickedDate}
                onChange={(value) => setPickedDate(value)}
              />
              <div className="d-flex flex-row justify-content-center align-items-center my-3">
                <span className="me-4">Select Time</span>
                <Select
                  options={timeOptions}
                  styles={customStyles}
                  value={pickedTime}
                  isSearchable={false}
                  onChange={(option) => setPickedTime(option)}
                />
              </div>
            </div>
          )}
        </div>
        <div className={classes.appointmentTabs}>
          <div className={getTabStyle(0)} onClick={() => setTab(0)}>
            Upcoming {tab == 0 && <hr className={classes.activeTab} />}
          </div>
          <div className={getTabStyle(1)} onClick={() => setTab(1)}>
            Past {tab == 1 && <hr className={classes.activeTab} />}
          </div>
          <div className={getTabStyle(2)} onClick={() => setTab(2)}>
            Cancelled {tab == 2 && <hr className={classes.activeTab} />}
          </div>
        </div>
        <div className={classes.appWrapper}>
          {appointments.map((app) => {
            return (
              <div key={app.date} className={classes.appContainer}>
                <div className="d-flex mb-2">
                  <div
                    style={{
                      height: '85px',
                      width: '85px',
                      borderRadius: '50%',
                      backgroundColor: 'lightblue',
                    }}
                  />
                  <div className="d-flex flex-column ps-3 py-1 justify-content-between">
                    <div className={classes.appTitle}>{app.doctorName}</div>
                    <div className={classes.appDescription}>
                      {app.category} | {getStatusBadge(app.status)}
                    </div>
                    <div className={classes.appDescription}>
                      {formatDateTime(app.date)}
                    </div>
                  </div>
                </div>
                <hr className="mb-2 mt-0" style={{ color: '#EEF0F3' }} />
                {getButtons(app)}
              </div>
            );
          })}
        </div>
      </SideCard>
    </div>
  );
};

export default AppointmentsCard;

const timeOptions = [
  { value: null, label: 'Any' },
  { value: '07:00', label: '7:00 AM' },
  { value: '08:00', label: '8:00 AM' },
  { value: '09:00', label: '9:00 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '13:00', label: '1:00 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '17:00', label: '5:00 PM' },
  { value: '18:00', label: '6:00 PM' },
  { value: '19:00', label: '7:00 PM' },
  { value: '20:00', label: '8:00 PM' },
  { value: '21:00', label: '9:00 PM' },
  { value: '22:00', label: '10:00 PM' },
  { value: '23:00', label: '11:00 PM' },
  { value: '00:00', label: '12:00 AM' },
  { value: '01:00', label: '1:00 AM' },
  { value: '02:00', label: '2:00 AM' },
  { value: '03:00', label: '3:00 AM' },
  { value: '04:00', label: '4:00 AM' },
  { value: '05:00', label: '5:00 AM' },
  { value: '06:00', label: '6:00 AM' },
];

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: '110px',
    backgroundColor: 'white',
    border: 'none',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.09)',
    borderRadius: '17px',
    textAlign: 'start',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#193842',
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
    fontWeight: state.isFocused ? '500' : '400',
    color: state.isFocused ? 'black' : '#666666',
    textAlign: 'left',
    backgroundColor: 'transparent',
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: '12px',
    fontWeight: '600',
    color: '#193842',
  }),
  valueContainer: (provided) => ({
    ...provided,
    backgroundColor: 'transparent',
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: '180px',
    '::-webkit-scrollbar': {
      width: '3px',
      height: '0px',
    },
    '::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '3px',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  }),
};
