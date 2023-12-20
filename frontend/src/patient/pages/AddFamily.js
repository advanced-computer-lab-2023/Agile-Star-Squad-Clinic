import InputField from '../../shared/components/InputField/InputField';
import { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from '../../shared/components/Modal/Modal';
import '../../shared/components/InputField/InputField.css';
import UserContext from '../../user-store/user-context';
import { toastMeError } from '../../shared/components/util/functions';

const AddFamilyForm = (props) => {
  const userCtx = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: '',
    NationalID: '',
    age: '',
    gender: 'male',
    relation: 'husband',
    email: '',
    mobileNumber: '',
  });

  const handleChange = (event, name) => {
    const value = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onAdd = async () => {
    const { name, NationalID, age } = formData;

    if (name && NationalID && age) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(formData),
      };
      fetch(
        `http://localhost:3000/patients/${userCtx.userId}/familyMembers`,
        requestOptions,
      );
      props.exit();
      props.onAddFamily(formData);
    } else {
      toastMeError('Please fill in all required fields');
    }
  };

  return ReactDOM.createPortal(
    <Modal exit={props.exit}>
      <InputField
        label="Name"
        name="name"
        value={formData.name}
        onChange={(event) => handleChange(event, 'name')}
      />
      <InputField
        label="NationalID"
        name="NationalID"
        type="number"
        value={formData.NationalID}
        onChange={(event) => handleChange(event, 'NationalID')}
      />
      <InputField
        label="Age"
        name="age"
        type="number"
        value={formData.age}
        onChange={(event) => handleChange(event, 'age')}
      />

      <div className="inputRow">
        <label className="inputLabel">Relation:</label>
        <select
          className="input-field"
          name="relation"
          value={formData.relation}
          onChange={(event) => handleChange(event, 'relation')}
        >
          <option value="husband">Husband</option>
          <option value="wife">Wife</option>
          <option value="son">Son</option>
          <option value="daughter">Daughter</option>
        </select>
      </div>
      <div className="inputRow">
        <label className="inputLabel">Gender </label>
        <select
          className="input-field"
          name="gender"
          value={formData.gender}
          onChange={(event) => handleChange(event, 'gender')}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
        If this family member is already a patient (not required)
      </p>
      <InputField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={(event) => handleChange(event, 'email')}
      />
      <InputField
        label="Mobile Number"
        name="mobileNumber"
        value={formData.mobileNumber}
        onChange={(event) => handleChange(event, 'mobileNumber')}
      />
      <div className="d-flex justify-content-end mt-5">
        <button className="formButtons" onClick={onAdd}>
          <span>Add</span>
        </button>
      </div>
    </Modal>,
    document.getElementById('backdrop-root'),
  );
};

export default AddFamilyForm;
