import NavBar from "../../shared/components/NavBar/NavBar";
import { DUMMY_USER } from "../../shared/DummyUsers";
import DateCard from "./PatientHome/DateCard";
import classes from "./HomePage.module.css";

const imageUrl = "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"


const HomePage = () => {
    const patientId = DUMMY_USER._id;

    const getPatientData = async () => {
        await fetch(`http://localhost:3000/patients/${patientId}`).then(async (response) => {
            const json = await response.json();
            const patientJson = json.data.patient;
            
        })
    }
    return <>
        <NavBar />
        <Greeting name={"KAREEM ELKADERY"} imageUrl={imageUrl} />
        <Dashboard/>
    </>
}

const Dashboard = (props) => {
    return <section className={classes.dashSection}>
        <div className={classes.dashContainers}>
            <div className="col-1"/>
            <div className={`col-5 ${classes.appointmentWrapper}`}>
                <h3>UPCOMING APPOINTMENTS</h3>
                <div className={classes.appointmentContainer}>
                    <div className={classes.dateText}>TUE<br/>OCT<br/>11</div>
                    <div className={classes.appointmentRight}>
                        <img src={imageUrl}/>
                        <div className={classes.timeText}>12:00 PM</div>
                    </div>
                    <div className={classes.doctorCard}>
                        <div className={classes.doctorName}>DOCTOR AHMED TAWFIK</div>
                        <div className={classes.doctorSpecialty}>Paediatrician</div>
                    </div>
                </div>
            </div>
            <div className="col-1"/>
            <div className="col-4">
                <h3>ACTIVE PRESCRIPTIONS</h3>
                <div className={classes.prescriptionContainer}>
                    <div className={classes.prescriptionCard}>
                        <div className={classes.prescriptionStatus}>{props.isFilled ? "FILLED" : "UNFILLED"}</div>
                        <div className={classes.prescriptionDate}>21/8 - 10/9</div>
                        {!props.isFilled && <div className={classes.prescriptionCart}>
                            <img width={24} height={24} src={require("../../assets/shoppingCart.png")}/>
                            </div>
                            }

                        <div className={classes.prescriptionDetails}>

                            <img src={require("../../assets/pill.png")}/>
                            <div>
                                <div className={classes.prescriptionName}>Cataflam</div>
                                <div className={classes.prescriptionDosage}>1 Pill | Daily</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-1"/>
        </div>
        <div className={classes.calendar}>
            <DateCard/>
        </div>
    </section>
}

const Greeting = (props) => {
    return <div className={classes.greetingContainer}>
        <img src={props.imageUrl} />
        <div>
            <h1 className={classes.name}>{props.name}</h1>
            <div className={classes.subtitle}>WELCOME BACK, WE'RE HAPPY<br/>TO SEE YOU AGAIN</div>
        </div>
    </div>
}

export default HomePage;