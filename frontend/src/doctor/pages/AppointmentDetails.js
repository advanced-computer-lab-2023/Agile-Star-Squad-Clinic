import Modal from '../../../shared/components/Modal/Modal';
import ReactDOM from "react-dom";

const AppointmentDetails = (props) => {

    const onAccept = () => {

    }

    const onReject = () => {

    }

    return ReactDOM.createPortal(
        <Modal exit={props.exit}>
            <div>
                <span><h4>Patient</h4></span>
                <span>{props.data['patient']}</span>
            </div>
            <div>
                <span><h4>Date of Appointment</h4></span>
                <span>{props.data['dateOfAppointment']}</span>
            </div>
        </Modal>, document.getElementById("backdrop-root")
    );
}


export default AppointmentDetails;