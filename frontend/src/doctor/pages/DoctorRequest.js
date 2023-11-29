import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import storage from '../../index';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import classes from '../doctorRequest.module.css';
import logo from './logo.png';
import Medicines from './Medicines.png';

const DoctorRequestForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    hourlyRate: '',
    affiliation: '',
    educationalBackground: '',
    speciality: '',
  });
  const [idImageForm, setIdImage] = useState("");
  const [medicalLicenseForm, setLicenseImage] = useState("");
  const [medicalDegreeForm, setDegreeImage] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onIdImageChange = (file) => {
    setIdImage(file.target.files[0]);
  }

  const onMedicalLicenseChange = (file) => {
    setLicenseImage(file.target.files[0]);
  }

  const onMedicalDegreeChange = (file) => {
    setDegreeImage(file.target.files[0]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    let idDownloadUrl;
    let licenseDownloadUrl;
    let degreeDownloadUrl;

    if (idImageForm !== "") {
      const idImageRef = ref(storage, `${idImageForm.name}`);
      await uploadBytesResumable(idImageRef, idImageForm).then(async (snapshot) => {
        idDownloadUrl = await getDownloadURL(snapshot.ref);
      });
    }

    if (medicalLicenseForm !== "") {
      const medicalLicenseRef = ref(storage, `${medicalLicenseForm.name}`);
      await uploadBytesResumable(medicalLicenseRef, medicalLicenseForm).then(async (snapshot) => {
        licenseDownloadUrl = await getDownloadURL(snapshot.ref)
      });
    }

    if (medicalDegreeForm !== "") {
      const medicalDegreeRef = ref(storage, `${medicalDegreeForm.name}`);
      await uploadBytesResumable(medicalDegreeRef, medicalDegreeForm).then(async (snapshot) => {
        degreeDownloadUrl = await getDownloadURL(snapshot.ref)
      });
    }

    const data = {
      "username": formData.username,
      "name": formData.name,
      "email": formData.email,
      "password": formData.password,
      "dateOfBirth": formData.dateOfBirth,
      "hourlyRate": formData.hourlyRate,
      "affiliation": formData.affiliation,
      "educationalBackground": formData.educationalBackground,
      "speciality": formData.speciality,
      "idImage": idDownloadUrl,
      "medicalLicense": licenseDownloadUrl,
      "medicalDegree": degreeDownloadUrl
    }

    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(data),
        credentials: 'include',
      };
      const response = await fetch(
        'http://localhost:3000/doctors',
        requestOptions
      );

      if (response.ok) {
        // Handle a successful response
        alert('Request is pending...');
        navigate('/');
      } else {
        // Handle errors if the server response is not ok
        const responseData = await response.json();
        alert(responseData.message);
        navigate('/');
      }
    } catch (error) {
      // Handle network errors
      alert('Network error: ' + error.message);
    }
  };

  const {
    username,
    name,
    email,
    password,
    dateOfBirth,
    hourlyRate,
    affiliation,
    educationalBackground,
    speciality,
  } = formData;
  const { idImage } = idImageForm;
  const { medicalLicense } = medicalLicenseForm;
  const { medicalDegree } = medicalDegreeForm;

  return (
    <body className={classes.background}>
      <div className='d-flex'>
        <div className={`${classes.mainBackground} col-5`}>
          <div className={classes.logo}>
            <img src={logo} alt="Clinic Logo" />
          </div>
          <img src={Medicines} alt="Medicines" className={classes.medicinesImage} />
        </div>

        <div className={`${classes.secondBackground} col-7`}>
          {
            <div className={classes.customText}>
              <p className={classes.p1}>Create Account</p>

              <form onSubmit={handleSubmit}>
                <div className={classes.textBoxContainer}>
                  <div>
                    <input
                      type="text"
                      name="username"
                      value={username}
                      onChange={handleInputChange}
                      placeholder='User Name'
                      className={classes.textBox}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleInputChange}
                      placeholder='Full Name'
                      className={classes.textBox}
                    />
                  </div>
                </div>
                <div className={classes.textBoxContainer}>
                  <div>
                    <input
                      type="text"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                      placeholder='Email Address'
                      className={classes.textBox}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                      placeholder='Password'
                      className={classes.textBox}
                    />
                  </div>
                </div>
                <div className={classes.textBoxContainer}>

                  <div>
                    <input
                      type="text"
                      name="hourlyRate"
                      value={hourlyRate}
                      onChange={handleInputChange}
                      placeholder='Hourly Rate'
                      className={classes.textBox}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="speciality"
                      value={speciality}
                      onChange={handleInputChange}
                      placeholder='Speciality'
                      className={classes.textBox}
                    />
                  </div>
                </div>
                <div className={classes.textBoxContainer}><div>
                  <input
                    type="text"
                    name="affiliation"
                    value={affiliation}
                    onChange={handleInputChange}
                    placeholder='Affiliation'
                    className={classes.textBox}
                  />
                </div>
                  <div>
                    <input
                      type="text"
                      name="educationalBackground"
                      value={educationalBackground}
                      onChange={handleInputChange}
                      placeholder='Educational Background'
                      className={classes.textBox}
                    />
                  </div>
                </div>

                <div>
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>ID</label>
                  <input
                    type="file"
                    name="idImage"
                    value={idImage}
                    onChange={onIdImageChange}
                  />
                </div>
                <div>
                  <label>Medical License</label>
                  <input
                    type="file"
                    name="medicalLicense"
                    value={medicalLicense}
                    onChange={onMedicalLicenseChange}
                  />
                </div>
                <div>
                  <label>Medical Degree</label>
                  <input
                    type="file"
                    name="medicalDegree"
                    value={medicalDegree}
                    onChange={onMedicalDegreeChange}
                  />
                </div>
                <button className={classes.button} type="submit">Request registration</button>
              </form>
            </div>
          }
        </div>
      </div>
    </body>
  );
};

export default DoctorRequestForm;
