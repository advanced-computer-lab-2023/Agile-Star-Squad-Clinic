import ReactDOM from 'react-dom';
import React, { useState, useEffect, useContext, useRef } from 'react';
import Card from '../../shared/components/Card/Card';

import axios from 'axios';
import PrescriptionDetail from '../../prescriptions/pages/PrescriptionDetails';

import styles from '../pages/PatientDetails.module.css';
import AddNewPrescription from '../../prescriptions/AddNewPrescription';
import EditPrescriptionDetails from '../../prescriptions/pages/EditPrescriptionDetails';
import jsPDF from 'jspdf';
import PrescriptionPDF from '../../patient/pages/prescriptions/PrescriptionPDF';

const PatientPrescriptionDetails = (props) => {
  const [finalPrescriptions, setPrescriptions] = useState([]);
  const [detailsOn, setDetailsOn] = useState(false);
  const [addNewOn, setaddNewOn] = useState(false);
  const [editOn, setEditOn] = useState(false);
  const [doctorName, setDoctorName] = useState(false);
  const [chosenPrescription, setChosenPrescription] = useState(null);
  const [showTempPdf, setShowTempPdf] = useState(false);
  const pdfRef = useRef();
  const patient = props.patient;
  const doctor = props.doctor;
  const fetchPrescriptions = async () => {
    try {
      fetch(`http://localhost:3000/patients/${patient._id}/prescriptions`, {
        credentials: 'include',
      }).then(async (response) => {
        const json = await response.json();
        const prescriptions = patient.prescription;
        // console.log("hello123",prescriptions[0]);
        // console.log("hello123",prescriptions.filter(prescription => prescription.doctor === doctor.userId));

        const response2 = await axios.post(
          'http://localhost:3000/prescriptions/list',
          {
            prescriptions,
          },
        );
        // console.log("hello123",response2.data.data.prescriptions.filter(prescription => prescription.doctor === doctor.userId));
        
        setPrescriptions(
          response2.data.data.prescriptions.filter(
            (prescription) => prescription.doctor === doctor.userId,
          ),
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchdoctor = async () => {
    const response = await axios.get(
      `http://localhost:3000/doctors/${props.doctor.userId}`,
    );

    setDoctorName(response.data.data.doctor.name);
  };


  const downloadPrescriptions = () => {
    const doc = new jsPDF({ orientation: "landscape", format: [1450, 780], unit: "px" });
    doc.setFont('Helvetica', 'normal');

    doc.html(pdfRef.current, {
      async callback(doc) {
        doc.save('Clinic Prescription');
      },
    });
  }
  const submitPrescHandler = (newPrescription) => {
    //  fetchPrescriptions();
    setPrescriptions((prev) => {
      return [...prev, newPrescription];
    });
  };
  const submitEditPrescHandler = (editedPrescription) => {
    const updatedPrescriptions = finalPrescriptions.map((prescription) =>
      prescription._id === editedPrescription._id
        ? editedPrescription
        : prescription,
    );
    setPrescriptions(updatedPrescriptions);
  };
  useEffect(() => {
    fetchPrescriptions();
    fetchdoctor();
  }, []);

  const addPrescriptionHandler = () => {
    setaddNewOn(true);
  };

  const handleClose = () => {
    setDetailsOn(false);
    setShowTempPdf(false)
  };
  const handleClose2 = () => {
    setaddNewOn(false);
  };
  const handleClose3 = () => {
    setEditOn(false);
  };
  const viewButtonHandler = (prescription) => {
    setChosenPrescription(prescription);
    setShowTempPdf(true);
    setDetailsOn(true);
  };
  const editButtonHandler = (prescription) => {
    setChosenPrescription(prescription);

    setEditOn(true);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString(); // Adjust this to fit your desired date format
  };
  return (
    <React.Fragment>
      <Card className={styles.prescriptionDetails}>
        <div className={styles.prescriptionHeader}>
          <h3 className={styles.welcomeText} style={{ textAlign: 'center' }}>
            Prescriptions
          </h3>
          <button onClick={addPrescriptionHandler}>Add New Prescription</button>
        </div>
        <div className={styles.prescriptionList}>
          {finalPrescriptions.length != 0 &&
            finalPrescriptions.map((url, index) => {
              return (
                <>
                  <div className={styles.prescriptionItem}>
                    <p>
                      <strong>Prescription {index + 1} </strong>
                      <br /> {url.body}
                    </p>
                    <div>
                      <button
                        className={styles.patientButton}
                        onClick={() => editButtonHandler(url)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.patientButton}
                        onClick={() => viewButtonHandler(url)}
                        style={{ marginLeft: '10px' }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </Card>
      {detailsOn && chosenPrescription && (
        <PrescriptionDetail onDownload={downloadPrescriptions} data={chosenPrescription} exit={handleClose} />
      )}
      {editOn && chosenPrescription && (
        <EditPrescriptionDetails
          prescription={chosenPrescription}
          doctor={doctor}
          patient={patient}
          editedPresc={submitEditPrescHandler}
          exit={handleClose3}
        />
      )}
      {addNewOn && (
        <AddNewPrescription
          doctor={doctor}
          patient={patient._id}
          exit={handleClose2}
          onAddPrescription={submitPrescHandler}
        />
      )}
      {showTempPdf && chosenPrescription != null && <div ref={pdfRef} className='position-absolute w-100'>
        <PrescriptionPDF prescriptions={chosenPrescription.items.map(presc => {
        return { name: presc.name, dosage: presc.dosage, frequency: presc.frequency, doctor: doctorName, date: formatDate(chosenPrescription.dateOfCreation), status: chosenPrescription.status, _id: chosenPrescription._id.substring(0,7) }
      })} />
      </div>}
    </React.Fragment>
  );
};
export default PatientPrescriptionDetails;
