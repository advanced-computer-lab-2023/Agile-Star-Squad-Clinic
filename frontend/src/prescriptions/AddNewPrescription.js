import ReactDOM from "react-dom";
import React, { useState } from "react";
import Modal from "../shared/components/Modal/Modal";

const AddNewPrescription = (props) => {
    const [addedBody,setAddedBody]=useState('')
    const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemDosage, setItemDosage] = useState('');
  const [itemFrequency, setItemFrequency] = useState('');
  const[showAddItemInputs,setShowAddItemInputs]= useState(false);
  const onDelete = async (event) => {
    event.preventDefault();
    const toAddPrescription={doctor:props.doctor.userId,patient:props.patient,body:addedBody,items:items}
    console.log("Presc",toAddPrescription)
    
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
    const newItem = {
      name: itemName,
      dosage: itemDosage,
      frequency: itemFrequency
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
          <input type="text" value={addedBody} onChange={(e) => setAddedBody(e.target.value)} required></input>
        </div>
        
        <div>
            <h4>Prescribed Medications: </h4>
            {items.map((item, index) => (
              <div key={index}>
                <p>Name : {item.name} &nbsp; Dosage : {item.dosage} &nbsp; Frequency : {item.frequency} </p>

              </div>
            ))}
          </div>
          {!showAddItemInputs && <button onClick={()=>setShowAddItemInputs(true)}>Add New Item</button>}
          {showAddItemInputs&&<div>
            <h4>Add Medication:</h4>
            <div>
              <label>Name</label>
              <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
            </div>
            <div>
              <label>Dosage</label>
              <input type="text" value={itemDosage} onChange={(e) => setItemDosage(e.target.value)} />
            </div>
            <div>
              <label>Frequency</label>
              <input type="text" value={itemFrequency} onChange={(e) => setItemFrequency(e.target.value)} />
            </div>
            <button type="submit" >Add</button>
          </div>}
        </form>
      </React.Fragment>
    );
  };

  return ReactDOM.createPortal(
    <Modal exit={props.exit}>
      {getPrescBody()}
      <ActionButtons onDelete={onDelete} />
    </Modal>,
    document.getElementById("backdrop-root")
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
