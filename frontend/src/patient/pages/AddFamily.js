import InputField from '../../shared/components/InputField/InputField';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from '../../shared/components/Modal/Modal';
import '../../shared/components/InputField/InputField.css'

const AddFamilyForm = (props) => {
  const [name, setName] = useState('');
  const [NationalID, setNationalID] = useState('');
  const [age, setage] = useState('');
  const [gender, setgender] = useState('');
  const [relation, setrelation] = useState('');

  const [isLoading, setLoading] = useState(false);

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onNationalIDChange = (event) => {
    setNationalID(event.target.value);
  };
  const onAgeChange = (event) => {
    setage(event.target.value);
  };
  const onGenderChange = (event) => {
    setgender(event.target.value);
  };
  const onRelationChange = (event) => {
    setrelation(event.target.value);
  };

  const onAdd = async () => {
    setLoading(true);
    const data = {
      name: name,
      NationalID: NationalID,
      age: age,
      gender: gender,
      relation: relation,
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data),
    };
    fetch(
      'http://localhost:3000/patients/65270df9cfa9abe7a31a4d88/familyMembers',
      requestOptions
    );
    props.exit();
    props.onAddFamily(data);
  };

  return ReactDOM.createPortal(
    <Modal exit={props.exit}>
<InputField label="Name" value={name} onChange={onNameChange} />
  <InputField label="NationalID" value={NationalID} onChange={onNationalIDChange} />
  <InputField label="Age" value={age} onChange={onAgeChange} />
  
  <div className= "inputRow">
    <label className='inputLabel'>Relation:</label>
    <select className='input-field' value={relation} onChange={onRelationChange}>
      <option value="husband">Husband</option>
      <option value="wife">Wife</option>
      <option value="son">Son</option>
      <option value="daughter">Daughter</option>
    </select>
  </div>
  <div className= "inputRow">
    <label className='inputLabel'>Gender </label>
    <select className='input-field'
      name="gender"
      value={gender}
      onChange={onGenderChange}
    >
      <option  value="male">Male</option>
      <option  value="female">Female</option>
    </select>
  </div>
        <NewButton onAdd={onAdd} isLoading={isLoading} />


    </Modal>, document.getElementById("backdrop-root"));

};

export default AddFamilyForm;

const NewButton = (props) => {
  return (
    <div className="d-flex justify-content-end mt-5">
      <button className="formButtons" onClick={props.onAdd}>
        {!props.isLoading && <span>Add</span>}
        {props.isLoading && <div className="loader" />}
      </button>
    </div>
  );
};