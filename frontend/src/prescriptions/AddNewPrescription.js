import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import Modal from '../shared/components/Modal/Modal';
import axios from 'axios';
import plus from './plus.png';
import styles from './AddNewPrescription.module.css';
import Select from 'react-select';

const AddNewPrescription = (props) => {
  const [addedBody, setAddedBody] = useState('');
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemDosage, setItemDosage] = useState('');
  const [itemFrequency, setItemFrequency] = useState('');
  const [showAddItemInputs, setShowAddItemInputs] = useState(false);
  const [medicineList, setMedicineList] = useState([]);
  const [medicineId, setMedicineId] = useState(null);
  const [doctorName, setDoctorName] = useState('');

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
        alert('Prescription Added Successfully');
        props.exit();
        props.onAddPrescription(toAddPrescription);
      } else {
        alert('Failed to send data.');
      }
    } catch (error) {
      alert('Network error: ' + error.message);
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
          {showAddItemInputs && medicineList && (
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
                {/* <select
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
                </select> */}
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

export default AddNewPrescription;

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
