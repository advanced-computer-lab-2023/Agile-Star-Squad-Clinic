import { useContext, useEffect, useState } from "react";
import UserContext from "../../../user-store/user-context";
import DoctorNavbar from "../../components/DoctorNavBar";
import classes from "./DoctorHomepage.module.css";
import calendarImg from "../../../assets/doctorHomepage/calendarCheckmark.png";
import defaultProfileImg from "../../../assets/doctorHomepage/defaultProfile.jpg";
import { useNavigate } from "react-router-dom";
import JoinMeetingCard from "../../../shared/components/Meeting/JoinMeetingCard";

const DoctorHomepage = () => {
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [appointments, setAppointments] = useState(null);
    const [filteredAppointements, setFilteredAppointements] = useState();
    const [currentAppointment, setCurrentAppointment] = useState(null);
    const userCtx = useContext(UserContext);


    useEffect(() => {
        // fetchMyPatients();
        fetchUpcomingAppointments();
        if (userCtx && userCtx.userId) {
            fetchDoctor();
        }
    }, [userCtx]);

    useEffect(() => {
        if (appointments == null) return;
        const now = new Date();
        const apps = appointments.map((appointment) => {
            const date = new Date(appointment.date);
            const weekday = getWeekday(date.getDay());
            const month = getMonth(date.getMonth());
            const day = date.getDate();
            const time = getTime(date);
            const doctorName = doctor.name.toUpperCase();
            const doctorSpecialty = doctor.speciality;

            if (
                date.getDate() === now.getDate() &&
                date.getMonth() === now.getMonth() &&
                date.getFullYear() === now.getFullYear() &&
                date.getHours() === now.getHours() + 2
            ) {
                console.log('current appointment', appointment);
                setCurrentAppointment(appointment);
            }
            return { weekday, month, day, time, doctorName, doctorSpecialty };
        });
    }, [appointments])

    const fetchDoctor = () => {
        //hardcode id
        fetch(`http://localhost:3000/doctors/${userCtx.userId}`, {
            credentials: 'include',
        }).then(async (response) => {
            const json = await response.json();
            const doctor = json.data.doctor; //check
            setDoctor({
                ...doctor,
            });
        });
    };

    const fetchUpcomingAppointments = () => {
        fetch(
            `http://localhost:3000/doctors/${userCtx.userId}/upComingAppointments`,
            {
                credentials: 'include',
            }
        ).then(async (response) => {
            const json = await response.json();
            const appointmentsJson = json.data.appointments;
            setAppointments(
                appointmentsJson.map((appointment) => {
                    return {
                        id: appointment['_id'],
                        ...appointment
                    };
                })
            );
            setFilteredAppointements(
                appointmentsJson.map((appointment) => {
                    return {
                        id: appointment['_id'],
                        ...appointment
                    };
                })
            );
        });
    };

    const getStatCard = (title, subtitle, color) => {
        return <div className={classes.statCard} style={{ backgroundColor: color }}>
            <img className="me-3" src={calendarImg} />
            <div>
                <div className={classes.statCardTitle}>{title}</div>
                <div className={classes.statCardSubtitle}>{subtitle}</div>
            </div>
        </div>
    }

    const getPatientTile = (patient) => {
        const dob = new Date(patient.dateOfBirth);
        const age = new Date(Date.now()).getFullYear() - dob.getFullYear();
        console.log(patient)

        const toPatient = () => {
            navigate("/patient", {state: patient })
        }

        return <div className={classes.patientTile}>
            <img src={defaultProfileImg} />
            <div className="ms-3" style={{ flex: 1 }}>
                <div className={classes.patientName}>{patient.name}</div>
                <div className={classes.patientDescription}>{patient.gender}, {age}, {patient.mobileNumber} </div>
            </div>
            <div onClick={toPatient} className={classes.patientButton}>View</div>
        </div>
    }

    const getAppointmentTile = (app) => {
        const options = {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        };
        console.log(app.date)
        const dateFormatter = new Intl.DateTimeFormat('en-US', options);
        const formattedDate = dateFormatter.format(new Date(app.date));
        return <div className={classes.patientTile}>
            <img src={defaultProfileImg} />
            <div className="ms-3" style={{ flex: 1 }}>
                <div className={classes.patientName}>{formattedDate}</div>
                <div className={classes.patientDescription}>{app.patientName}</div>
            </div>
        </div>
    }

    return (
        <div>
            <DoctorNavbar />
            <div className={classes.main}>
                {doctor != null && doctor.name && (
                    <div className={classes.welcomeText}>Welcome, Dr. {doctor.name}!</div>
                )}
                <div className={classes.secondaryText}>Have a nice day at work</div>

                {doctor != null && appointments != null && <div className={classes.statContainer}>
                    {getStatCard(doctor.patients.length, "Total Patients", color1)}
                    {getStatCard(doctor.appointments.length, "Total Appointments", color2)}
                    {getStatCard(appointments.length, "Upcoming Appointments", color3)}
                </div>}

                <div className="d-flex justify-content-between w-100 px-5">
                    <div className="col-4">
                        <h3>MY PATIENTS</h3>
                        <div className={classes.appointmentContainer}>
                            {doctor != null && doctor.patients.map(patient => getPatientTile(patient))}
                        </div>
                    </div>
                    <div >
                        {currentAppointment && (
                            <div className={`${classes.appointmentWrapper}`} style={{scale: "0.8"}}>
                                <h3>CURRENT APPOINTMENT</h3>
                                <JoinMeetingCard
                                    name={doctor.name}
                                    specialty={doctor.speciality}
                                    time={getTime(new Date(currentAppointment.date))}
                                    for={currentAppointment.patientName}
                                    imageUrl={
                                        doctor.image ??
                                        'https://www.w3schools.com/howto/img_avatar.png'
                                    }
                                />
                            </div>
                        )}
                    </div>
                    <div className="col-3">
                        <h3>UPCOMING APPOINTMENTS</h3>
                        <div className={classes.appointmentContainer}>
                            {appointments != null && appointments.map(app => getAppointmentTile(app))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorHomepage


const color1 = '#ABD1D3';
const color2 = '#AED3E2';
const color3 = '#96B7C7';
const color4 = '#193842';




const getWeekday = (number) => {
    switch (number) {
        case 0:
            return 'SUN';
        case 1:
            return 'MON';
        case 2:
            return 'TUE';
        case 3:
            return 'WED';
        case 4:
            return 'THU';
        case 5:
            return 'FRI';
        case 6:
            return 'SAT';
        default:
            break;
    }
};

const getMonth = (number) => {
    switch (number) {
        case 0:
            return 'JAN';
        case 1:
            return 'FEB';
        case 2:
            return 'MAR';
        case 3:
            return 'APR';
        case 4:
            return 'MAY';
        case 5:
            return 'JUN';
        case 6:
            return 'JUL';
        case 7:
            return 'AUG';
        case 8:
            return 'SEP';
        case 9:
            return 'OCT';
        case 10:
            return 'NOV';
        case 11:
            return 'DEC';
        default:
            break;
    }
};

function getTime(date) {
    let hours = date.getHours() - 2;
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const time = hours + ':' + minutes + ' ' + ampm;
    return time;
}