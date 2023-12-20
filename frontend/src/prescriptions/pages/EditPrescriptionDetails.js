import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import Modal from '../../shared/components/Modal/Modal';
import axios from 'axios';
import plus from '../plus.png'
import styles from '../AddNewPrescription.module.css';
import Select from 'react-select';
import { toastMeError, toastMeSuccess } from '../../shared/components/util/functions';

const EditPrescriptionDetails = (props) => {
  const [items, setItems] = useState(props.prescription.items);
  const [itemName, setItemName] = useState('');
  const [itemDosage, setItemDosage] = useState('');
  const [itemFrequency, setItemFrequency] = useState('');
  const [chosenItem, setChosenItem] = useState(null);
  const [chosenItemName, setChosenItemName] = useState('');
  const [ChosenItemDosage, setChosenItemDosage] = useState('');
  const [ChosenItemFrequency, setChosenItemFrequency] = useState('');
  const [showAddItemInputs, setShowAddItemInputs] = useState(false);
  const [showEditItemInputs, setShowEditItemInputs] = useState(false);
  const [medicineList, setMedicineList] = useState([]);
  const [medicineId, setMedicineId] = useState(null);
  const [doctorName, setDoctorName] = useState('');

  //patient id, doctor id, doctor name,medicine list,prescription id
  const fetchMedicineList = async () => {
    const response = await axios.get('http://localhost:4000/medicine');

    setMedicineList(response.data.data.medicines);
    setMedicineId(response.data.data.medicines[0]._id);
  };

  useEffect(() => {
    fetchMedicineList();
  }, []);
  const fetchdoctor = async () => {
    const response = await axios.get(
      `http://localhost:3000/doctors/${props.doctor.userId}`,
    );

    setDoctorName(response.data.data.doctor.name);
  };

  useEffect(() => {
    fetchdoctor();
  }, []);
  const specificEditHandler=(medic)=>{
    setShowEditItemInputs(true)
    setChosenItem(medic)
    // setChosenItemName(medic.name)
    setChosenItemFrequency(medic.frequency) 
    setChosenItemDosage(medic.dosage) 
    
  }
  const specificDeleteHandler=(medic)=>{
    
    // setChosenItem(medic)
    const updatedItems = items.filter((item) => item !== medic);
    setItems(updatedItems);
    setShowEditItemInputs(false);
    
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    const toAddPrescription = {
      doctor: props.doctor.userId,
      doctorName: doctorName,
      patient: props.patient,
      items: items,
    };

    try {
      const response = await fetch(`http://localhost:3000/prescriptions/${props.prescription._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toAddPrescription),
      });
      const responeData=await response.json()
      const presc= responeData.data.presc;
      // console.log(presc)
      if (response.ok) {
        toastMeSuccess('Prescription Edited Successfully');
         props.editedPresc(presc )
        props.exit();
      } else {
        toastMeError('Failed to send data.');
      }
    } catch (error) {
      toastMeError('Network error: ' + error.message);
    }
  };
  const cancelHandler = (e) => {
    props.exit();
  };
  const addPresHandler = (e) => {
    // setaddNewOn(true);
    e.preventDefault();
    // console.log(e.target.value)
    const medicine = medicineList.find(
      (medicine) => medicine._id == medicineId._id,
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
  
  const onSubmitEdit = () => {
    console.log(medicineId)
    const updatedItems = items.map((item) =>
      item === chosenItem
        ? {
            ...item,
            name: medicineId.name,
            dosage: ChosenItemDosage,
            frequency: ChosenItemFrequency,
          }
        : item
    );
    setItems(updatedItems);
    setShowEditItemInputs(false);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString(); // Adjust this to fit your desired date format
  };
  const getPrescBody = () => {
    return (
      <React.Fragment>
        <form onSubmit={addPresHandler} style={{ color:  '#193842'}}>
          
          <div>
            <br />
            <h4><strong>Prescribed Medications:</strong> </h4>
            {/* {items.map((item, index) => (
              <div key={index}>
                <p>
                  Name : {item.name} &nbsp; Dosage : {item.dosage} &nbsp;
                  Frequency : {item.frequency}{' '}
                </p>
                <button className={styles.patientButton} onClick={()=>specificEditHandler(item)} > Edit</button>
                <button className={styles.patientButton} onClick={()=>specificDeleteHandler(item)} > Delete</button>
              </div>
            ))} */}
            <table className={styles.prescriptionTable}>
    <thead>
      <tr>
        <th>Name</th>
        <th>Dosage</th>
        <th>Frequency</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item, index) => (
        <tr key={index}>
          <td>{item.name}</td>
          <td>{item.dosage}</td>
          <td>{item.frequency}</td>
          <td>
            <button className={styles.patientButton} onClick={() => specificEditHandler(item)}>Edit</button>
            <button className={styles.patientButton} onClick={() => specificDeleteHandler(item)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
          </div>
          <br/>
          {!showAddItemInputs && !showEditItemInputs && (
            <button
              className={styles.patientButton}
              onClick={() => setShowAddItemInputs(true)}
            >
              Add New Medicine
              <img
                src={plus}
                alt="plus"
                width={18}
                height={18}
                style={{ marginBottom: '3px', marginLeft: '5px' }}
              />
            </button>
          )}
          {showAddItemInputs && !showEditItemInputs && medicineList && (
            <div className={styles.thingyPopsOut}>
              <h4>Add Medication:</h4>
              <div>
                <label>Name</label>
                <Select
                  className="mb-3 mt-1"
                  value={medicineId}
                  styles={customStyles}
                  options={medicineList.map((medicine) => {
                    return { ...medicine, label: medicine.name };
                  })}
                  onChange={(value) => setMedicineId(value)}
                  required
                />
               
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
                  style={{ paddingBottom: '15px' }}
                />
              </div>
              <br />
              <button type="submit" className={styles.patientButton}>
                Add Medicine{' '}
              </button>
              <button
                onClick={() => setShowAddItemInputs(false)}
                className={styles.patientButton}
                style={{ marginLeft: '10px' }}
              >
                Cancel
              </button>
            </div>
          )}
          {showEditItemInputs && !showAddItemInputs &&medicineList && (
            <div className={styles.thingyPopsOut}>
              <h4>Add Medication:</h4>
              <div>
                <label>Name</label>
                <Select
                  className="mb-3 mt-1"
                  value={medicineId}
                  styles={customStyles}
                  options={medicineList.map((medicine) => {
                    return { ...medicine, label: medicine.name };
                  })}
                  onChange={(value) => setMedicineId(value)}
                  required
                />
               
              </div>
              <div>
                <label>Dosage</label>
                <input
                  type="text"
                  value={ChosenItemDosage}
                  className="form-control"
                  onChange={(e) => setChosenItemDosage(e.target.value)}
                />
              </div>
              <div>
                <label>Frequency</label>
                <input
                  type="text"
                  className="form-control"
                  value={ChosenItemFrequency}
                  onChange={(e) => setChosenItemFrequency(e.target.value)}
                  style={{ paddingBottom: '15px' }}
                />
              </div>
              <br />
              <button onClick={onSubmitEdit} className={styles.patientButton}>
                Edit Medicine
              </button>
              <button
                onClick={() => setShowEditItemInputs(false)}
                className={styles.patientButton}
                style={{ marginLeft: '10px' }}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </React.Fragment>
    );
  };

  return ReactDOM.createPortal(
    <Modal exit={props.exit}>
      {getPrescBody()}
      <ActionButtons onDelete={onSubmit} onCancel={cancelHandler} />
    </Modal>,
    document.getElementById('backdrop-root'),
  );
};

const ActionButtons = (props) => {
  return (
    <div className="d-flex justify-content-end mt-5">
      <button
        onClick={props.onCancel}
        className={styles.mainButton}
        style={{ marginRight: '420px' }}
      >
        Cancel
      </button>
      <button onClick={props.onDelete} className={styles.mainButton}>
        Submit
      </button>
    </div>
  );
};

export default EditPrescriptionDetails;

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#f5f5f5',
    border: 'none',
    borderBottom: '1px solid #E2E4E5',
    textAlign: 'start',
  }),

  placeholder: (provided, state) => ({
    ...provided,
    color: state.isFocused ? '#000' : '#888',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    transition: 'transform 0.3s',
    transform: 'rotate(0deg)',
    borderLeft: 'none',
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
  value: (provided) => ({
    ...provided,
    borderRadius: '20px',
    backgroundColor: 'transparent',
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: '14px',
  }),
  valueContainer: (provided) => ({
    ...provided,
    backgroundColor: 'transparent',
  }),
  menuList: (base) => ({
    ...base,

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
