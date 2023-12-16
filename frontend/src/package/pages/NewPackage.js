import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Card from '../../shared/components/Card/Card';
import styles from './NewPackage.module.css';

const NewPackage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [pricePerYear, setPricePerYear] = useState('');
  const [doctorSessionDiscount, setDoctorSessionDiscount] = useState('');
  const [medicineDiscount, setMedicineDiscount] = useState('');
  const [familyMemberDiscount, setFamilyMemberDiscount] = useState('');
  const [description, setDescription] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Validate form data
    if (
      !name ||
      !pricePerYear ||
      !doctorSessionDiscount ||
      !medicineDiscount ||
      !familyMemberDiscount
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    const data = {
      name,
      pricePerYear,
      doctorSessionDiscount,
      medicineDiscount,
      familyMemberDiscount,
     
    };

    try {
      const response = await fetch('http://localhost:3000/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle a successful response
        alert('Package Added Succesfully');

        navigate('/packages');
      } else {
        // Handle errors if the server response is not ok
        alert('Failed to send data.');
      }
    } catch (error) {
      // Handle network errors
      alert('Network error: ' + error.message);
    }
  };
  return (
    <Card className={`${styles.addForm}`}>
  <div className={styles.topBorder}></div>
  <div className={styles.title}>Add Health Package</div>
  <form onSubmit={submitHandler}>
  <div className={styles.fieldGroup}>
    <div className={styles.nameField}>
      <span className={styles.smallText}>Package Name</span>
      <input
        key={'name'}
        type="text"
        className="form-control"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
    </div>
    <div className={styles.field}>
      <span className={styles.smallText}>Price</span>
      <input
        type="number"
        className="form-control"
        required
        value={pricePerYear}
        onChange={(e) => setPricePerYear(e.target.value)}
      />
    </div>
  </div>
  <div className={styles.fieldGroup}>
    <div className={styles.field}>
      <span className={styles.smallText}>Session Discount</span>
      <input
        type="number"
        className="form-control"
        required
        value={doctorSessionDiscount}
        onChange={(e) => setDoctorSessionDiscount(e.target.value)}
      />
    </div>
    <div className={styles.field}>
      <span className={styles.smallText}>Medicine Discount</span>
      <input
        type="number"
        className="form-control"
        required
        value={medicineDiscount}
        onChange={(e) => setMedicineDiscount(e.target.value)}
      />
    </div>
    <div className={styles.field}>
      <span className={styles.smallText}>Family Discount</span>
      <input
        type="number"
        className="form-control"
        required
        value={familyMemberDiscount}
        onChange={(e) => setFamilyMemberDiscount(e.target.value)}
      />
    </div>
  </div>
  
  <button className={styles.addButton} type="submit">
    SAVE
  </button>
</form>


    </Card>
  );
};

export default NewPackage;
