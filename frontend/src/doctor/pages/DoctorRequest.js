import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import storage from '../../index';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


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
    console.log("3ayesh?");

      if (idImageForm !== "") {
        console.log("ID")
        console.log(idImageForm);
        const idImageRef = ref(storage, `${idImageForm.name}`);
        await uploadBytesResumable(idImageRef, idImageForm).then(async (snapshot) => {
          idDownloadUrl = await getDownloadURL(snapshot.ref);
          console.log(idDownloadUrl);
        });
      }

    if (medicalLicenseForm !== "") {
      console.log("License");
      console.log(medicalLicenseForm);
    
      // const imageExtension = medicalLicenseForm['path'].substring(medicalLicenseForm['path'].lastIndexOf('.'));
      const medicalLicenseRef = ref(storage, `${medicalLicenseForm.name}`);
      await uploadBytesResumable(medicalLicenseRef, medicalLicenseForm).then(async (snapshot) => {
        licenseDownloadUrl = await getDownloadURL(snapshot.ref)
        console.log(licenseDownloadUrl);
      });
    }

    if (medicalDegreeForm !== "") {
      console.log("Degree");
      console.log(medicalDegreeForm);
      // const imageExtension = medicalDegreeForm['path'].substring(medicalDegreeForm['path'].lastIndexOf('.'));
      const medicalDegreeRef = ref(storage, `${medicalDegreeForm.name}`);
      await uploadBytesResumable(medicalDegreeRef, medicalDegreeForm).then(async (snapshot) => {
        degreeDownloadUrl = await getDownloadURL(snapshot.ref)
        console.log(degreeDownloadUrl);
      });
    }
    
    // setIdImage(idDownloadUrl);
    // setLicenseImage(licenseDownloadUrl);
    // setDegreeImage(degreeDownloadUrl);

    // console.log(idImageForm);
    // console.log(medicalLicenseForm);
    // console.log(medicalDegreeForm);

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
    console.log(data);

    try {
      console.log(data);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(data),
      };
      const response = await fetch(
        'http://localhost:3000/doctors',
        requestOptions
      );
      console.log("response");
      console.log(response);

      if (response.ok) {
        // Handle a successful response
        alert('Request is pending...');
        navigate('/');
      } else {
        // Handle errors if the server response is not ok
        alert('Registration Failed!');
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
  const {idImage} = idImageForm;
  const {medicalLicense} = medicalLicenseForm;
  const {medicalDegree} = medicalDegreeForm;


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="text"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
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
        <label>Hourly Rate</label>
        <input
          type="text"
          name="hourlyRate"
          value={hourlyRate}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Affiliation</label>
        <input
          type="text"
          name="affiliation"
          value={affiliation}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Educational Background</label>
        <input
          type="text"
          name="educationalBackground"
          value={educationalBackground}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Speciality</label>
        <input
          type="text"
          name="speciality"
          value={speciality}
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
      <button type="submit">Request registration</button>
    </form>
  );
};

export default DoctorRequestForm;
