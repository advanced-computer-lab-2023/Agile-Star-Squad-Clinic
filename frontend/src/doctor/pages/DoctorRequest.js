import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


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
    idImage: '',
    medicalLicense: '',
    medicalDegree: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setImage(event.target.files);
    setImageUrl(files !== "" ? URL.createObjectURL(file) : "");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    let idDownloadUrl;
    let licenseDownloadUrl;
    let degreeDownloadUrl;

    if (idImage !== "") {
        const imageRef = ref(storage, `${idImage.name}`);
        await uploadBytesResumable(imageRef, idImage).then(async (snapshot) => {
          idDownloadUrl = await getDownloadURL(snapshot.ref);
        });
    }

    if (medicalLicense !== "") {
        const avatarRef = ref(storage, `${avatar.name}`);
        await uploadBytesResumable(avatarRef, avatar).then(async (snapshot) => {
            licenseDownloadUrl = await getDownloadURL(snapshot.ref) });
    }

    if (medicalDegree !== "") {
      const avatarRef = ref(storage, `${avatar.name}`);
      await uploadBytesResumable(avatarRef, avatar).then(async (snapshot) => {
          degreeDownloadUrl = await getDownloadURL(snapshot.ref) });
  }

  formData.idImage = idDownloadUrl;
  formData.medicalLicense = licenseDownloadUrl;
  formData.medicalDegree = degreeDownloadUrl;

    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(formData),
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
    idImage,
    medicalLicense,
    medicalDegree
  } = formData;

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
          onChange={handleFileChange}
        />
      </div>
      <div>
        <label>Medical License</label>
        <input
          type="file"
          name="medicalLicense"
          value={medicalLicense}
          onChange={handleFileChange}
        />
      </div>
      <div>
        <label>Medical Degree</label>
        <input
          type="file"
          name="medicalDegree"
          value={medicalDegree}
          onChange={handleFileChange}
        />
      </div>
      <button type="submit">Request registration</button>
    </form>
  );
};

export default DoctorRequestForm;
