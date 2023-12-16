import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../shared/components/Card/Card';
import styles from './NewPackage.module.css';

const NewPackage = ({ onSubmitSuccess }) => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [pricePerYear, setPricePerYear] = useState('');
  const [doctorSessionDiscount, setDoctorSessionDiscount] = useState('');
  const [medicineDiscount, setMedicineDiscount] = useState('');
  const [familyMemberDiscount, setFamilyMemberDiscount] = useState('');
  const [formVisible, setFormVisible] = useState(true); // Track form visibility

  const submitHandler = async (event) => {
    event.preventDefault();

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
        alert('Package Added Successfully');
        navigate('/packages');
        setFormVisible(false); // Hide the form after successful submission
        onSubmitSuccess();
      } else {
        alert('Failed to send data.');
      }
    } catch (error) {
      alert('Network error: ' + error.message);
    }
    
  };
  
  return (
    <>
    <div id="form">
      {formVisible && (
        <Card className={`${styles.addForm}`}>
          <div className={styles.topBorder}></div>
          <div className={styles.title}>Add Health Package</div>
          <form  onSubmit={submitHandler} className={styles.form}>
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
      )}
      </div>
    </>
  );
};

export default NewPackage;
