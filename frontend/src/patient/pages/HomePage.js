import NavBar from "../../shared/components/NavBar/NavBar";
import { DUMMY_USER } from "../../shared/DummyUsers";
import classes from "./HomePage.module.css";

const HomePage = () => {
    const patientId = DUMMY_USER._id;
    const imageUrl = "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"

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
            {/* <div className="col-2"/> */}
            <div className={`col-7 ${classes.appointmentWrapper}`}>
                <h3>UPCOMING APPOINTMENTS</h3>
                <div className={classes.appointmentContainer}></div>
            </div>
            <div className="col-5">
                <h3>ACTIVE PRESCRIPTIONS</h3>
                <div className={classes.prescriptionContainer}></div>
            </div>
        </div>
    </section>
}

const Greeting = (props) => {
    return <div className={classes.greetingContainer}>
        <img src={props.imageUrl}/>
        <div>
            <h1 className={classes.name}>{props.name}</h1>
            <div className={classes.subtitle}>WELCOME BACK, WE'RE HAPPY<br/>TO SEE YOU AGAIN</div>
        </div>
    </div>
}

export default HomePage;