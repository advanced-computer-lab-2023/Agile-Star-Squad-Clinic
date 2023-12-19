import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import Modal from '../shared/components/Modal/Modal';
import axios from 'axios';
import plus from './plus.png'
import styles from './AddNewPrescription.module.css'
import { toastMeError, toastMeSuccess } from '../shared/components/util/functions';

const AddNewPrescription = (props) => {
  const [addedBody, setAddedBody] = useState('');
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemDosage, setItemDosage] = useState('');
  const [itemFrequency, setItemFrequency] = useState('');
  const [showAddItemInputs, setShowAddItemInputs] = useState(false);
  const [medicineList, setMedicineList] = useState([]);
  const [medicineId, setMedicineId] = useState(null);
  const [doctorName,setDoctorName]=useState('')

  const fetchMedicineList = async () => {
    const response = await axios.get('http://localhost:4000/medicine');

    setMedicineList(response.data.data.medicines);
    setMedicineId(response.data.data.medicines[0]._id);
  };

  useEffect(() => {
    fetchMedicineList();
  }, []);
  const fetchdoctor = async () => {
    const response = await axios.get(`http://localhost:3000/doctors/${props.doctor.userId}`);

    setDoctorName(response.data.data.doctor.name);
    
  };

  useEffect(() => {
    fetchdoctor();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const toAddPrescription = {
      doctor: props.doctor.userId,
      doctorName: doctorName,
      patient: props.patient,
      body: addedBody,
      items: items,
    };

    try {
      const response = await fetch('http://localhost:3000/prescriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toAddPrescription),
      });

      if (response.ok) {
        toastMeSuccess('Prescription Added Successfully');
        props.exit();
        props.onAddPrescription(toAddPrescription);
      } else {
        toastMeError('Failed to send data.');
      }
    } catch (error) {
      toastMeError('Network error: ' + error.message);
    }
  };
  const cancelHandler=(e)=>{
    props.exit()
  }
  const addPresHandler = (e) => {
    // setaddNewOn(true);
    e.preventDefault();
    const medicine = medicineList.find(
      (medicine) => medicine._id == medicineId,
    );
    const newItem = {
      medicineId: medicine._id,
      name: medicine.name,
      dosage: itemDosage,
      frequency: itemFrequency,
    };
    setItems([...items, newItem]);
    setItemName('');
    setItemDosage('');
    setItemFrequency('');
    setShowAddItemInputs(false);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString(); // Adjust this to fit your desired date format
  };
  const getPrescBody = () => {
    return (
      <React.Fragment>
        <form onSubmit={addPresHandler}>
          <div>
            <label>Details</label>
            <input
              type="text"
              value={addedBody}
              className="form-control" 
              onChange={(e) => setAddedBody(e.target.value)}
              required
            ></input>
          </div>

          <div>
            <br/>
            <h4>Prescribed Medications: </h4>
            {items.map((item, index) => (
              <div key={index}>
                <p>
                  Name : {item.name} &nbsp; Dosage : {item.dosage} &nbsp;
                  Frequency : {item.frequency}{' '}
                </p>
              </div>
            ))}
          </div>
          {!showAddItemInputs && (
            <button  className={styles.patientButton} onClick={() => setShowAddItemInputs(true)}>
              Add New Medicine 
              <img src={plus} alt='plus' width={18} height={18} style={{marginBottom:'3px', marginLeft:'5px'}}/>
            </button>
          )}
          {showAddItemInputs && medicineList && (
            <div>
              <h4>Add Medication:</h4>
              <div>
                <label>Name</label>
                <select
              
                // class="dropdown"
                  value={medicineId.name}
                  onChange={(e) => {
                    setMedicineId(e.target.value);
                  }}
                >
                  {medicineList.map((medicine, index) => (
                    <option key={index} value={medicine._id}>
                      {medicine.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Dosage</label>
                <input
                  type="text"
                  value={itemDosage}
                  className="form-control" 
                  onChange={(e) => setItemDosage(e.target.value)}
                />
              </div>
              <div>
                <label>Frequency</label>
                <input
                  type="text"
                  className="form-control" 
                  value={itemFrequency}
                  onChange={(e) => setItemFrequency(e.target.value)}
                  style={{paddingBottom:'15px'}}
                />
              </div>
              <br/>
              <button type="submit" className={styles.patientButton}  >Add Medicine </button>
              <button onClick={()=>setShowAddItemInputs(false)}className={styles.patientButton} style={{marginLeft:"10px"}} >Cancel</button>
            </div>
          )}
        </form>
      </React.Fragment>
    );
  };

  return ReactDOM.createPortal(
    <Modal exit={props.exit}>
      {getPrescBody()}
      <ActionButtons onDelete={onSubmit} onCancel={cancelHandler}/>
    </Modal>,
    document.getElementById('backdrop-root'),
  );
};

const ActionButtons = (props) => {
  return (
    <div className="d-flex justify-content-end mt-5">
      
      <button onClick={props.onCancel} className={styles.mainButton} style={{marginRight:'420px'}}>Cancel</button>
      <button onClick={props.onDelete} className={styles.mainButton}>Submit</button>
    </div>
  );
};

export default AddNewPrescription;
