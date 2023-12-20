// UpdatePackage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../shared/components/Card/Card';
import styles from './NewPackage.module.css';
import { toastMeError, toastMeSuccess } from '../../shared/components/util/functions';

const UpdatePackage = ({ packageId, onUpdate, exit, updates }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [pricePerYear, setPricePerYear] = useState('');
  const [doctorSessionDiscount, setDoctorSessionDiscount] = useState('');
  const [medicineDiscount, setMedicineDiscount] = useState('');
  const [familyMemberDiscount, setFamilyMemberDiscount] = useState('');
  const [formVisible, setFormVisible] = useState(true); // Track form visibility

  // const toggleAddForm = () => {
  //   onClose(); // Close the form by calling the onClose callback
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/packages/${packageId}`);
        if (response.ok) {
          const data = await response.json();
          const {
            name,
            pricePerYear,
            doctorSessionDiscount,
            medicineDiscount,
            familyMemberDiscount,
          } = data.data.package;

          setName(name);
          setPricePerYear(pricePerYear);
          setDoctorSessionDiscount(doctorSessionDiscount);
          setMedicineDiscount(medicineDiscount);
          setFamilyMemberDiscount(familyMemberDiscount);
        } else {
          toastMeError('Failed to fetch package data.');
        }
      } catch (error) {
        console.log(error)
        console.log("hey")
        toastMeError('Network error: ' + error.message);
      }
    };
    fetchData();
  }, [packageId]);

  const submitHandler = async () => {
    const data = {
      name,
      pricePerYear,
      doctorSessionDiscount,
      medicineDiscount,
      familyMemberDiscount,
    };
  
    try {
      const response = await fetch(`http://localhost:3000/packages/${packageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
       
        toggleAddForm();
        toastMeSuccess('Package updated successfully.');
        onUpdate({...data, _id:packageId})
        navigate('/packages');
      } else {
        toastMeError('Failed to update data.');
      }
    } catch (error) {
      toastMeError('Network error: ' + error.message);
      console.log(error)
    }
  };
  


  const confirmDeleteHandler = async () => {
    try {
      await fetch(`http://localhost:3000/packages/${packageId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

    
      toggleAddForm();
      toastMeSuccess('Package deleted successfully.');
      navigate('/packages');
    } catch (err) {
      toastMeError('Failed to delete package.');
    }
  };


  const toggleAddForm = () => {
    setFormVisible((prevShowAddForm) => !prevShowAddForm);
  };
  
  const handleFormSubmitSuccess = () => {
    setFormVisible(false); // Close the form after successful submission
  };

  return (
    <>
    <div id='updates'>
      {formVisible && (
        <div id='updates' className={styles.overlay}>
        <Card className={`${styles.updateForm}`}>
          <div className={styles.topBorder} ></div>
          <div className={styles.title}>Update Health Package</div>
          <form className={styles.form} >
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

            <button className={styles.addButton} type="button" onClick={submitHandler}>
              SAVE
            </button>
          </form>
          <button className={styles.deleteButton} onClick={confirmDeleteHandler}>
            DELETE
          </button>
        </Card>
        </div>
      )}
      </div>
    </>
  );
};

export default UpdatePackage;
