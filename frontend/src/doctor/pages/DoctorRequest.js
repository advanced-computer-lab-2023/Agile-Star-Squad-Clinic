import React, { useState, useCallback } from 'react';
import Dropzone from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import storage from '../../index';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import classes from '../doctorRequest.module.css';
import logo from '../images/logo.png';
import Medicines from '../images/Medicines.png';
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';
import uploadImg from '../../assets/doctorRequest/upload.png';
import { toastMeError, toastMeSuccess } from '../../shared/components/util/functions';

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
  const [idImageForm, setIdImage] = useState([]);
  const [medicalLicenseForm, setLicenseImage] = useState([]);
  const [medicalDegreeForm, setDegreeImage] = useState([]);
  const [personalImageForm, setPersonalImage] = useState([]);

  const [dobDay, setDOBDay] = useState('');
  const [dobMonth, setDOBMonth] = useState('');
  const [dobYear, setDOBYear] = useState('');

  const navigate = useNavigate();

  const dayOptions = () => {
    let days = [];
    for (let i = 1; i <= 31; i++) {
      days.push({ value: i, label: i });
    }
    return days;
  };

  const monthOptions = () => {
    let months = [];
    for (let i = 1; i <= 12; i++) {
      months.push({ value: i, label: i });
    }
    return months;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onIdImageChange = (file) => {
    setIdImage(file.target.files[0]);
  };

  const onMedicalLicenseChange = (file) => {
    setLicenseImage(file.target.files[0]);
  };

  const onMedicalDegreeChange = (file) => {
    setDegreeImage(file.target.files[0]);
  };

  const onPersonalImageChange = (file) => {
    setPersonalImage(file.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let personalImageUrl;
    let idDownloadUrl;
    let licenseDownloadUrl;
    let degreeDownloadUrl;

    if (personalImageForm !== '') {
      const idImageRef = ref(storage, `${personalImageForm.name}`);
      await uploadBytesResumable(idImageRef, personalImageForm).then(
        async (snapshot) => {
          personalImageUrl = await getDownloadURL(snapshot.ref);
        },
      );
    }

    if (idImageForm !== "") {
      const idImageRef = ref(storage, `${idImageForm[0].name}`);
      await uploadBytesResumable(idImageRef, idImageForm[0]).then(async (snapshot) => {
        idDownloadUrl = await getDownloadURL(snapshot.ref);
      });
    }

    if (medicalLicenseForm !== "") {
      const medicalLicenseRef = ref(storage, `${medicalLicenseForm[0].name}`);
      await uploadBytesResumable(medicalLicenseRef, medicalLicenseForm[0]).then(async (snapshot) => {
        licenseDownloadUrl = await getDownloadURL(snapshot.ref)
      });
    }

    if (medicalDegreeForm !== "") {
      const medicalDegreeRef = ref(storage, `${medicalDegreeForm[0].name}`);
      await uploadBytesResumable(medicalDegreeRef, medicalDegreeForm[0]).then(async (snapshot) => {
        degreeDownloadUrl = await getDownloadURL(snapshot.ref)
      });
    }

    const date = new Date(`${dobYear}-${dobMonth.value}-${dobDay.value}`);

    const data = {
      "username": formData.username,
      "name": formData.name,
      "email": formData.email,
      "password": formData.password,
      "dateOfBirth": date,
      "hourlyRate": formData.hourlyRate,
      "affiliation": formData.affiliation,
      "educationalBackground": formData.educationalBackground,
      "speciality": formData.speciality,
      "personalImage": personalImageUrl,
      "idImage": idDownloadUrl,
      "medicalLicense": licenseDownloadUrl,
      "medicalDegree": degreeDownloadUrl,
    };

    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(data),
        credentials: 'include',
      };
      const response = await fetch(
        'http://localhost:3000/doctors',
        requestOptions,
      );

      if (response.ok) {
        // Handle a successful response
        toastMeSuccess('Request is pending, please wait for approval.');
        navigate('/');
      } else {
        // Handle errors if the server response is not ok
        toastMeError("Registeration request failed, please try again.");
        // navigate('/');
      }
    } catch (error) {
      // Handle network errors
      toastMeError('Network error: ' + error.message);
    }
  };

  const {
    username,
    name,
    email,
    password,
    hourlyRate,
    affiliation,
    educationalBackground,
    speciality,
  } = formData;
  const { personalImage } = personalImageForm;
  const { idImage } = idImageForm;
  const { medicalLicense } = medicalLicenseForm;
  const { medicalDegree } = medicalDegreeForm;
  const { day } = dobDay;
  const { month } = dobMonth;
  const { year } = dobYear;

  return (
    <body className={classes.background}>
      <div className="d-flex">
        <div className={`${classes.mainBackground} col-5`}>
          <div className={classes.logo}>
            <img src={logo} alt="Clinic Logo" />
          </div>
          <img src={Medicines} alt="Medicines" className={classes.medicinesImage} />
        </div>

        <div className={`${classes.secondBackground} col-7`}>
          {
            <div className={classes.customText}>
              <p className={classes.p1}>Account Registration</p>

              <form onSubmit={handleSubmit} className={classes.formContainer}>
                <div className={classes.textBoxContainer}>
                  <div>
                    <input
                      type="text"
                      name="username"
                      value={username}
                      onChange={handleInputChange}
                      placeholder="Username"
                      className={classes.textBox}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className={classes.textBox}
                      required
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
                      placeholder="Email Address"
                      className={classes.textBox}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      className={classes.textBox}
                      required
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
                      placeholder="Hourly Rate"
                      className={classes.textBox}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="speciality"
                      value={speciality}
                      onChange={handleInputChange}
                      placeholder="Speciality"
                      className={classes.textBox}
                      required
                    />
                  </div>
                </div>
                <div className={classes.textBoxContainer}>
                  <div>
                    <input
                      type="text"
                      name="affiliation"
                      value={affiliation}
                      onChange={handleInputChange}
                      placeholder="Affiliation"
                      className={classes.textBox}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="educationalBackground"
                      value={educationalBackground}
                      onChange={handleInputChange}
                      placeholder="Educational Background"
                      className={classes.textBox}
                      required
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-betweem w100">
                  <Select
                    className={classes.daySelect}
                    value={day}
                    styles={customStyles}
                    options={dayOptions()}
                    placeholder={'DD'}
                    onChange={(value) => setDOBDay(value)}
                    required
                  />
                  <Select
                    className={classes.daySelect}
                    value={month}
                    styles={customStyles}
                    options={monthOptions()}
                    placeholder={'MM'}
                    onChange={(value) => setDOBMonth(value)}
                    required
                  />
                  <input
                    className={`${classes.daySelect} ${classes.textBox} mb-0`}
                    value={year}
                    type="number"
                    id="dobYear"
                    name="year"
                    placeholder="YYYY"
                    onChange={(e) => setDOBYear(e.target.value)}
                    required
                  />
                </div>
                <div
                  className="d-flex justify-content-between mb-3"
                  style={{ marginLeft: '-55px' }}
                >
                  <div className="col-3 px-2" style={{ zIndex: '1' }}>
                    <div className={classes.dropzoneTitle}>Profile Picture</div>
                    <MyDropzone files={personalImageForm} setFiles={setPersonalImage} onChange={onPersonalImageChange} maxFiles={1} toast={(s) => { }} />
                  </div>
                  <div className="col-3 px-2">
                    <div className={classes.dropzoneTitle}>Personal ID</div>
                    <MyDropzone files={idImageForm} setFiles={setIdImage} onChange={onIdImageChange} maxFiles={1} toast={(s) => { }} />
                  </div>
                  <div className="col-3 px-2">
                    <div className={classes.dropzoneTitle}>Medical Degree</div>
                    <MyDropzone files={medicalDegreeForm} setFiles={setDegreeImage} onChange={onMedicalDegreeChange} maxFiles={1} toast={(s) => { }} />
                  </div>
                  <div className="col-3 px-2">
                    <div className={classes.dropzoneTitle}>Medical License</div>
                    <MyDropzone files={medicalLicenseForm} setFiles={setLicenseImage} onChange={onMedicalLicenseChange} maxFiles={1} toast={(s) => { }} />
                  </div>
                </div>
                <button className={classes.button} type="submit">
                  Request Registration
                </button>
              </form>
            </div>
          }
        </div>
      </div>
    </body>
  );
};

export default DoctorRequestForm;

const MyDropzone = (props) => {
  const files = props.files;
  const setFiles = props.setFiles;
  const onDrop = useCallback((acceptedFiles) => {
    if (files.length + acceptedFiles.length > props.maxFiles) {
      props.toast(`Upload a maximum of ${props.maxFiles} files`);
      return;
    }
    if (acceptedFiles?.length) {
      console.log(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        }),
      );
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      ]);
    }
  });

  const rejectFile = () => {
    props.toast(`Only .PNG, .JPG and .PDF files are accepted`);
    return;
  };

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  return (
    <div className={classes.myDropzone}>
      <Dropzone
        onDrop={onDrop}
        onDropRejected={rejectFile}
        accept={{
          'image/png': ['png'],
          'image/jpeg': ['jpg'],
          'application/pdf': ['pdf'],
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section className="h-100">
            <div className="h-100" {...getRootProps()}>
              <input {...getInputProps()} />
              {files.length > 0 && (
                <aside style={thumbsContainer}>{thumbs}</aside>
              )}
              {files.length == 0 && (
                <div>
                  <img height={50} src={uploadImg} />
                  <div className="mt-3">Drag & drop files or Browse</div>
                  <div className={classes.dropzoneSubtitle}>
                    Supported formats: JPEG, PNG, PDF
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: '100%',
  height: '100%',
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  marginInline: 'auto',
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: '100%',
  height: '100%',
  marginTop: 8,
};

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#f5f5f5',
    border: 'none',
    borderBottom: '1px solid #E2E4E5',
    textAlign: 'start',
  }),

  placeholder: (provided, state) => ({
    ...provided,
    color: state.isFocused ? '#000' : '#888',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    transition: 'transform 0.3s',
    transform: 'rotate(0deg)',
    borderLeft: 'none',
  }),
  indicatorSeparator: () => ({}),
  menu: (provided) => ({
    ...provided,
    borderRadius: '20px',
  }),
  option: (provided, state) => ({
    ...provided,
    borderRadius: '14px',
    fontSize: '14px',
    fontWeight: state.isFocused ? '500' : '400',
    color: state.isFocused ? 'black' : '#666666',
    textAlign: 'left',
    backgroundColor: 'transparent',
  }),
  value: (provided) => ({
    ...provided,
    borderRadius: '20px',
    backgroundColor: 'transparent',
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: '14px',
  }),
  valueContainer: (provided) => ({
    ...provided,
    backgroundColor: 'transparent',
  }),
  menuList: (base) => ({
    ...base,

    '::-webkit-scrollbar': {
      width: '3px',
      height: '0px',
    },
    '::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '3px',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  }),
};
