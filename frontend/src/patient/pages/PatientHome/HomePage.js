import NavBar from "./../../../shared/components/NavBar/NavBar";
import { DUMMY_USER } from "./../../../shared/DummyUsers";
import DateCard from "./DateCard";
import classes from "./HomePage.module.css";
import "./HomePage.css";
import { useState, useEffect, useContext } from "react";
import Carousel from "react-bootstrap/Carousel";
import BrowseDoctors from "../BrowseDoctors";
import UserContext from "../../../user-store/user-context";

const imageUrl = "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"


const PatientHomePage = () => {
    const [patient, setPatient] = useState({});
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [prescriptionsItems, setPrescriptionItems] = useState([]);

    const patientId = useContext(UserContext).userId;

    useEffect(() => {
        fetchPatient();
        fetchPrescriptions();
        fetchUpcomingAppointments();
    }, []);

    const fetchPatient = async () => {
        fetch(`http://localhost:3000/patients/${patientId}`).then(async (response) => {
            const json = await response.json();
            setPatient(json.data.patient);
        })
    }

    const fetchPrescriptions = () => {
        fetch("http://localhost:3000/patients/65270df9cfa9abe7a31a4d88/prescriptions").then(async (response) => {
            const json = await response.json();
            const prescriptionsJson = json.data.prescriptions;
            setPrescriptions(prescriptionsJson.map((prescription) => {
                return {
                    id: prescription["_id"],
                    ...prescription
                }
            }));
            prescriptionsJson.forEach(prescription => {
                setPrescriptionItems(previous => {
                    return [...previous, ...prescription.items.map(item => { return { status: prescription.status, ...item } })];
                });
            });
        });
    }
    const fetchUpcomingAppointments = () => {
        fetch(`http://localhost:3000/patients/${patientId}/upcomingAppointments`).then(async (response) => {
            const json = await response.json();
            const appointmentsJson = json.data.appointments;
            setUpcomingAppointments(appointmentsJson.map((appointment) => {
                return {
                    id: appointment["_id"],
                    ...appointment
                }
            }));
        });
    }
    return <>
        <NavBar />
        <Greeting name={patient['name']} imageUrl={imageUrl} />
        <Dashboard appointments={upcomingAppointments} prescriptions={prescriptionsItems} />
    </>
}

const Dashboard = (props) => {
    const appointments = props.appointments.map(appointment => {
        const date = new Date(appointment.date);
        const weekday = getWeekday(date.getDay());
        const month = getMonth(date.getMonth());
        const day = date.getDate();
        const time = getTime(date);
        const doctorName = appointment.doctorName.toUpperCase();
        const doctorSpecialty = appointment.doctorSpecialty;
        return { weekday, month, day, time, doctorName, doctorSpecialty };
    });

    console.log(props.prescriptions);

    const getAppointmentItem = (appointment) => {
        return <Carousel.Item>
            <div className={`${classes.appointmentItem}`}>
                <div className={classes.dateText}>{appointment.weekday}<br />{appointment.month}<br />{appointment.day}</div>
                <div className={classes.appointmentRight}>
                    <img src={imageUrl} />
                    <div className={classes.timeText}>{appointment.time}</div>
                </div>
                <div className={classes.doctorCard}>
                    <div className={classes.doctorName}>DOCTOR {appointment.doctorName}</div>
                    <div className={classes.doctorSpecialty}>{appointment.doctorSpecialty}</div>

                </div>
            </div>
        </Carousel.Item>;
    }

    const getPrescriptionItem = (item) => {
        const filledColor = item.status == "Filled" ? "" : classes.unfilledColor;
        return <div className={classes.prescriptionCard}>
            <div className={`${classes.prescriptionStatus} ${filledColor}`}>{item.status === "Filled" ? "FILLED" : "UNFILLED"}</div>
            <div className={classes.prescriptionDate}>21/8 - 10/9</div>
            {item.status !== "Filled" && <div className={classes.prescriptionCart}>
                <img width={24} height={24} src={require("../../../assets/patientHomepage/shoppingCart.png")} />
            </div>
            }
            <div className={classes.prescriptionDetails}>
                <img src={require("../../../assets/patientHomepage/pill.png")} />
                <div className="d-flex flex-column align-items-start">
                    <div className={classes.prescriptionName}>{item.name}</div>
                    <div className={classes.prescriptionDosage}>{item.dosage} | {item.frequency}</div>
                </div>
            </div>
        </div>;
    }

    return <>
     <section className={classes.dashSection}>
        <div className={classes.dashContainers}>
            <div className="col-1" />
            <div className={`col-5 ${classes.appointmentWrapper}`}>
                <h3>UPCOMING APPOINTMENTS</h3>
                <div className={classes.appointmentContainer}>
                    <Carousel controls={false} interval={5000}>
                        {appointments.map((appointment) =>
                            getAppointmentItem(appointment)
                        )}
                    </Carousel>
                </div>
            </div>
            <div className="col-1" />
            <div className="col-4">
                <h3>ACTIVE PRESCRIPTIONS</h3>
                <div className={`${classes.prescriptionContainer} scroller`}>
                    {props.prescriptions.map(prescription => getPrescriptionItem(prescription))}
                </div>
            </div>
            <div className="col-1" />
        </div>
        <div className={classes.calendar}>
        </div>
    </section>
    <section>
        <BrowseDoctors/>
    </section>
    </>
}

const Greeting = (props) => {
    let name = `${props.name}`;
    name = name.toUpperCase();
    return <div className={classes.greetingContainer}>
        <img src={props.imageUrl} />
        <div>
            <h1 className={classes.name}>{name}</h1>
            <div className={classes.subtitle}>WELCOME BACK, WE'RE HAPPY<br />TO SEE YOU AGAIN</div>
        </div>
    </div>
}

export default PatientHomePage;


const getWeekday = (number) => {
    switch (number) {
        case 0:
            return "SUN";
        case 1:
            return "MON";
        case 2:
            return "TUE";
        case 3:
            return "WED";
        case 4:
            return "THU";
        case 5:
            return "FRI";
        case 6:
            return "SAT";
        default:
            break;
    }
}

const getMonth = (number) => {
    switch (number) {
        case 0:
            return "JAN";
        case 1:
            return "FEB";
        case 2:
            return "MAR";
        case 3:
            return "APR";
        case 4:
            return "MAY";
        case 5:
            return "JUN";
        case 6:
            return "JUL";
        case 7:
            return "AUG";
        case 8:
            return "SEP";
        case 9:
            return "OCT";
        case 10:
            return "NOV";
        case 11:
            return "DEC";
        default:
            break;
    }
}

const getTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}