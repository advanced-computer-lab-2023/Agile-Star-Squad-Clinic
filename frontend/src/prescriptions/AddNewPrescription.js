import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import Modal from '../shared/components/Modal/Modal';
import axios from 'axios';

const AddNewPrescription = (props) => {
  const [addedBody, setAddedBody] = useState('');
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemDosage, setItemDosage] = useState('');
  const [itemFrequency, setItemFrequency] = useState('');
  const [showAddItemInputs, setShowAddItemInputs] = useState(false);
  const [medicineList, setMedicineList] = useState([]);
  const [medicineId, setMedicineId] = useState(null);

  const fetchMedicineList = async () => {
    const response = await axios.get('http://localhost:4000/medicine');
    setMedicineList(response.data.data.medicines);
    setMedicineId(response.data.data.medicines[0]._id);
  };

  useEffect(() => {
    fetchMedicineList();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const toAddPrescription = {
      doctor: props.doctor.userId,
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
        props.onAddPrescription();
      } else {
        alert('Failed to send data.');
      }
    } catch (error) {
      alert('Network error: ' + error.message);
    }
  };
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
              onChange={(e) => setAddedBody(e.target.value)}
              required
            ></input>
          </div>

          <div>
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
            <button onClick={() => setShowAddItemInputs(true)}>
              Add New Item
            </button>
          )}
          {showAddItemInputs && medicineList && (
            <div>
              <h4>Add Medication:</h4>
              <div>
                <label>Name</label>
                <select
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
                  onChange={(e) => setItemDosage(e.target.value)}
                />
              </div>
              <div>
                <label>Frequency</label>
                <input
                  type="text"
                  value={itemFrequency}
                  onChange={(e) => setItemFrequency(e.target.value)}
                />
              </div>
              <button type="submit">Add</button>
            </div>
          )}
        </form>
      </React.Fragment>
    );
  };

  return ReactDOM.createPortal(
    <Modal exit={props.exit}>
      {getPrescBody()}
      <ActionButtons onDelete={onSubmit} />
    </Modal>,
    document.getElementById('backdrop-root'),
  );
};

const ActionButtons = (props) => {
  return (
    <div className="d-flex justify-content-end mt-5">
      <button onClick={props.onDelete}>Add</button>
    </div>
  );
};

export default AddNewPrescription;
