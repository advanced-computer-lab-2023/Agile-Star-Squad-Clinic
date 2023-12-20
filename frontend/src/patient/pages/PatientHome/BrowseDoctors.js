import { useEffect, useState, useRef } from "react";
import { Form, useLocation, useNavigate } from 'react-router-dom';
import Calendar from "react-calendar"
import classes from "./BrowseDoctors.module.css";
import Select from "react-select";
import searchIconImg from '../../../assets/patientHomepage/search.png';
import arrowImage from '../../../assets/patientHomepage/backarrow.png';
import ophthalmology from '../../../assets/patientHomepage/ophthalmology.png';
import dentist from '../../../assets/patientHomepage/dentist.png';
import gas from '../../../assets/patientHomepage/gas.png';
import neurology from '../../../assets/patientHomepage/neurology.png';
import nutrition from '../../../assets/patientHomepage/nutrition.png';
import dermatology from '../../../assets/patientHomepage/dermatology.png'
import radiology from '../../../assets/patientHomepage/radiology.png';
import doc1 from '../../../assets/patientHomepage/doc1.png';
import email from '../../../assets/patientHomepage/email.png';
import call from '../../../assets/patientHomepage/call.png';
import calendarImg from '../../../assets/patientHomepage/calendar.png'
import NavBar from "../../../shared/components/NavBar/NavBar";
import 'react-calendar/dist/Calendar.css';
import { dialogContentClasses } from "@mui/material";
// import appoint from '../../assets/patientHomepage/appoint.png';


const BrowseDoctors = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState('name');
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [doctorSearchNameValue, setDoctorSearchName] = useState("");
  const [doctorSearchSpecialtyValue, setDoctorSearchSpecialty] = useState("");
  const [doctorSearchDateValue, setDoctorSearchDate] = useState("");
  const [doctorSpecialtyFilter, setDoctorSpecialtyFilter] = useState("submit");
  const [specialtyFilters, setSpecialtyFilters] = useState([]);
  const [showDoctorDateFilter, setShowDoctorDateFilter] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchOption, setSearchOption] = useState({ label: "Name" });
  const [categoryIndex, setCategoryIndex] = useState(-1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [pickedDate, setPickedDate] = useState("");
  const [pickedTime, setPickedTime] = useState("");
  const calendarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();



  const handleDropdownChange = (event) => {
    setSelectedDropdown(event.target.value);
    setShowDropdown(false);

    // Perform any actions based on the selected option
    if (event.target.value === 'name') {
      // Handle name option
    } else if (event.target.value === 'specialty') {
      // Handle specialty option
    }
  };

  const handleDoctorClick = (doctor) => {
    navigate(`/patient/appointment/book/`, { state: doctor });
  };

  const fetchDoctors = async (patientDiscount) => {
    fetch("http://localhost:3000/doctors/").then(async (response) => {
      const json = await response.json();
      const doctorsJson = json.data.doctors;
      const specialties = new Set();

      setDoctors(doctorsJson.map((doctor) => {
        const hourlyRate = doctor['hourlyRate'];
        const sessionPrice = hourlyRate * 1.1 * (1 - patientDiscount);
        specialties.add(doctor.speciality);
        return {
          id: doctor["_id"],
          sessionPrice: sessionPrice,
          ...doctor
        }
      }));

      setFilteredDoctors(doctorsJson.map((doctor) => {
        const hourlyRate = doctor['hourlyRate'];
        const sessionPrice = hourlyRate * 1.1 * (1 - patientDiscount);
        return {
          id: doctor["_id"],
          sessionPrice: sessionPrice,
          ...doctor
        }
      }));
      const specialtyList = ["Select", ...Array.from(specialties)]
      setSpecialtyFilters(specialtyList.map((spec) => <option value={spec}>{spec}</option>));

    });
  }

  const handleSearch = (e) => {
    e.preventDefault();
    // Use the selectedDropdown state to determine the search criteria
    if (selectedDropdown === 'name') {
      const filteredByName = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredDoctors(filteredByName);
    } else if (selectedDropdown === 'specialty') {
      const filteredBySpecialty = doctors.filter((doctor) =>
        doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredDoctors(filteredBySpecialty);
    }

  };

  useEffect(() => {
    applySearch();
  }, [searchText, searchOption, categoryIndex]);


  const applySearch = () => {
    let newDoctors = [...doctors];

    // Apply other filters first
    if (searchText !== "" && searchOption.label === "Name") {
      newDoctors = newDoctors.filter((doc) =>
        doc.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (searchText !== "" && searchOption.label === "Specialty") {
      newDoctors = newDoctors.filter((doc) =>
        doc.speciality.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (categoryIndex !== -1) {
      newDoctors = newDoctors.filter((doc) => doc.speciality === specialtyOptions[categoryIndex]);
    }

    // if (pickedDate !== "") {
    //   newDoctors = applyDateFilter(newDoctors);
    // }

    setFilteredDoctors(newDoctors);
  };

  const applyDateFilter = (doctorList) => {
    const pickedISODate = new Date(pickedDate).toISOString();
    const newDoctors = doctorList.filter((doctor) => {
      const appointments = doctor.appointments;
      const isNotFree = appointments.some((app) => {
        let start = new Date(app.dateOfAppointment);
        const end = new Date(start.getTime() + 1000 * 60 * 60).toISOString(); // ADDS 1 HOUR
        start = start.toISOString();
        const result = pickedISODate > start && pickedISODate < end;
        return result;
      });
      return !isNotFree;
    });

    return newDoctors;
  };


  useEffect(() => {
    fetchDoctors();
  }, []);


  const handlePickDate = (value) => {
    setShowCalendar(false);
    setPickedDate(value)
  }

  const getSpecialtyTiles = () => {
    const handleSelectSpecialty = (index) => {
      if (categoryIndex == index) {
        setCategoryIndex(-1);
      } else {
        setCategoryIndex(index);
      }
    }

    return <div className="d-flex" style={{ perspective: "4000px" }}>
      {specialtyOptions.map(option => {
        return <div className={`${classes.categoryTile} ${categoryIndex == option.index ? classes.active : ""}`} onClick={() => handleSelectSpecialty(option.index)}>
          <img height={40} src={option.img} />
          <div className={classes.categoryTitle}>{option.name}</div>
        </div>
      })}
    </div>
  }

  const getDoctorCard = (doctor) => {

    return <div onClick={() => handleDoctorClick(doctor)} className="col-4 px-4">
      <div className={classes.doctorContainer}>
        <div>
          <div className={classes.doctorImg}><img src={doctor.image} /></div>
          <div className={classes.sessionPrice}>{doctor.hourlyRate} L.E.<br />/ session</div>
        </div>
        <div className="d-flex flex-column align-items-start ms-3">
          <div className={classes.doctorName}>{doctor.name}</div>
          <div className={classes.doctorSpecialty}>{doctor.speciality}</div>
          <div className={classes.doctorCity}>Cairo</div>
          <div className={classes.doctorBio}>I am a highly experienced Physician in Internal Medicine with over 15 years of expertise in the field of medical research</div>
        </div>
      </div>
    </div>;
  }

  return <div>
    {props.where == null && <NavBar />}
    <section className={classes.medicineSection}>
      <div className={classes.medicineSectionTitle}>BROWSE DOCTORS</div>
      <div className={classes.medicineSearchContainer}>
        <div className={classes.medicineSearchIcon}><img width={30} src={searchIconImg} /></div>
        <input className={classes.medicineSearchInput} value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search" />
        <Select
          className={classes.daySelect}
          value={searchOption}
          styles={customStyles}
          isSearchable={false}
          options={[{ label: "Name" }, { label: "Specialty" }]}
          onChange={(value) => setSearchOption(value)}
          required />
        <div onClick={() => setShowCalendar(val => !val)} className={classes.calendarContainer}>
          <img height={30} src={calendarImg} />
        </div>
        {showCalendar && <div ref={calendarRef} onClick={() => console.log(calendarRef.current)} id="calendar" className={classes.calendarWrapper}>
          <Calendar className={classes.calendar} value={pickedDate} onChange={(value) => handlePickDate(value)} />
          <div className='d-flex flex-row justify-content-center align-items-center my-3'>
            <span className='me-4'>Select Time</span>
            <Select
              options={timeOptions}
              styles={customStyles}
              value={pickedTime}
              isSearchable={false}
              onChange={(option) => setPickedTime(option)}
            />
          </div>
        </div>}
      </div>
      {getSpecialtyTiles()}
    </section >
    <section>
      <div className={classes.resultsContainer}>
        {filteredDoctors.map(doctor => getDoctorCard(doctor))}
      </div>
    </section>
  </div >

  // return (
  //   <div className="position-relative" style={{ minHeight: "1200px" }}>
  //     <h1 className="Browse-Doctors_title">BROWSE DOCTORS</h1>
  //     <form className="Browse-Doctors_search" onSubmit={handleSearch}>
  //       <h2 className="Browse-Doctors_speciality">Speciality</h2>
  //       <div className="input-container">
  //         <img
  //           src={searchImage}
  //           alt="Search"
  //           width="25"
  //           height="18"
  //           className="search-icon_image"
  //         />

  //         <input
  //           type="text"
  //           placeholder="Search..."
  //           className="search-input"
  //           value={searchText}
  //           onChange={(e) => { setSearchText(e.target.value); handleSearch(e); }}
  //         />

  //         <div className="dropdown-container">
  //           {/* {!showDropdown && (
  //           <button
  //             type="button"
  //             className="filter-icon-button"
  //             onClick={() => setShowDropdown(true)}
  //           >
  //             <img
  //               src={filter}
  //               alt=""
  //               width="30"
  //               height="24"
  //               className="filter-icon-image"
  //               id="filter"
  //             />
  //           </button>
  //         )} */}

  //           {true && (
  //             <div className="dropdown-list">
  //               <select
  //                 value={selectedDropdown}
  //                 onChange={handleDropdownChange}
  //               >
  //                 <option value="name">Name</option>
  //                 <option value="specialty">Specialty</option>
  //               </select>
  //             </div>
  //           )}
  //         </div>

  //       </div>

  //     </form>

  //     <div className="container-fluid container-fluid1 d-flex mx-2 mb-5">
  //       <div className="row align-items-center">
  //         <div className="col" onClick={() => applyFilterBySpecialty('Ophthalmology')}>
  //           <img src={ophthalmology} alt="" className="icons" />
  //           <p className="text">Ophthalmology</p>
  //         </div>
  //         <div className="col" onClick={() => applyFilterBySpecialty('Dentist')}>
  //           <img src={dentist} alt="" className="icons" />
  //           <p className="text">Dentist</p>
  //         </div>
  //         <div className="col" onClick={() => applyFilterBySpecialty('Gastroenterology')}>
  //           <img src={gas} alt="" className="icons" />
  //           <p className="text">Gastroenterology</p>
  //         </div>
  //         <div className="col" onClick={() => applyFilterBySpecialty('Neurology')}>
  //           <img src={neurology} alt="" className="icons" />
  //           <p className="text">Neurology</p>
  //         </div>
  //         <div className="col" onClick={() => applyFilterBySpecialty('Radiology')}>
  //           <img src={radiology} alt="" className="icons" />
  //           <p className="text">Radiology</p>
  //         </div>
  //         <div className="col" onClick={() => applyFilterBySpecialty('Nutrition')}>
  //           <img src={nutrition} alt="" className="icons" />
  //           <p className="text">Nutrition</p>
  //         </div>
  //         <div className="col" onClick={() => applyFilterBySpecialty('Dermatology')}>
  //           <img src={dermatology} alt="" className="icons" />
  //           <p className="text">Dermatology</p>
  //         </div>


  //       </div>

  //     </div>

  //     <div className="container">
  //       <div className="row">
  //         {filteredDoctors.length === 0 ? (
  //           console.log("Filtered Doctors:pew", filteredDoctors)
  //         ) : (
  //           filteredDoctors.map((doctor) => (
  //             <div className="col-12 col-md-4" key={doctor.id}>
  //               <div className="doctors" onClick={() => handleDoctorClick(doctor)}>
  //                 <p className="name">{doctor.name}</p>
  //                 <p className="spec"> {doctor.speciality}</p>
  //                 <p className="rate"> ${doctor.hourlyRate}/session</p>
  //                 <p className="affil">{doctor.affiliation}</p>

  //                 <div className="right-section">
  //                   <div className="mobile">
  //                     <img
  //                       src={call}
  //                       alt="call"
  //                       width="25" // Adjust the width as needed
  //                       height="20" // Adjust the height as needed
  //                       className="comm-icon"
  //                     />
  //                     <p>{doctor.mobileNumber} </p>
  //                   </div>
  //                   <div className="appointment">
  //                     <img
  //                       src={appoint}
  //                       alt="appoint"
  //                       width="25" // Adjust the width as needed
  //                       height="20" // Adjust the height as needed
  //                       className="comm-icon"
  //                     />
  //                     <p>Make an appointment </p>
  //                   </div>
  //                   <div className="email">
  //                     <img
  //                       src={email}
  //                       alt="email"
  //                       width="25" // Adjust the width as needed
  //                       height="20" // Adjust the height as needed
  //                       className="comm-icon"
  //                     />
  //                     <p>{doctor.email} </p>
  //                   </div>
  //                   <p className="edu">{doctor.educationalBackground}</p>
  //                 </div>
  //                 <div className="doc1">
  //                   <img
  //                     src={doc1}
  //                     alt="doc1"
  //                     width="105px"
  //                     height="101px"
  //                     className="doc-icon"
  //                   />
  //                 </div>
  //               </div>
  //             </div>
  //           ))
  //         )}
  //       </div>
  //     </div>

  //   </div>


  // );
};

export default BrowseDoctors;

const specialtyOptions = [
  { name: "Opthalmology", img: ophthalmology, index: 0 },
  { name: "Dentist", img: dentist, index: 1 },
  { name: "Gastroenterology", img: gas, index: 2 },
  { name: "Neurology", img: neurology, index: 3 },
  { name: "Radiography", img: radiology, index: 4 },
  { name: "Nutrition", img: nutrition, index: 5 },
  { name: "Dermatology", img: dermatology, index: 6 },
]

const timeOptions = [
  { value: null, label: "Any" },
  { value: "07:00", label: "7:00 AM" },
  { value: "08:00", label: "8:00 AM" },
  { value: "09:00", label: "9:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "13:00", label: "1:00 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "16:00", label: "4:00 PM" },
  { value: "17:00", label: "5:00 PM" },
  { value: "18:00", label: "6:00 PM" },
  { value: "19:00", label: "7:00 PM" },
  { value: "20:00", label: "8:00 PM" },
  { value: "21:00", label: "9:00 PM" },
  { value: "22:00", label: "10:00 PM" },
  { value: "23:00", label: "11:00 PM" },
  { value: "00:00", label: "12:00 AM" },
  { value: "01:00", label: "1:00 AM" },
  { value: "02:00", label: "2:00 AM" },
  { value: "03:00", label: "3:00 AM" },
  { value: "04:00", label: "4:00 AM" },
  { value: "05:00", label: "5:00 AM" },
  { value: "06:00", label: "6:00 AM" },
];


const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'transparent',
    border: 'none',
    borderLeft: '1px solid #b2b2b2!important',
    borderRadius: '0',
    width: "120px",
    outline: 'none',
    textAlign: 'start',
    marginTop: '9px',
    boxShadow: 'none'
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
    fontWeight: state.isFocused ? "500" : "400",
    color: state.isFocused ? "black" : "#666666",
    textAlign: "left",
    backgroundColor: "transparent"
  }),
  value: (provided) => ({
    ...provided,
    borderRadius: '20px',
    backgroundColor: 'transparent',
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: '14px',
    color: "#797979",
    fontWeight: "500",
  }),
  valueContainer: (provided) => ({
    ...provided,
    backgroundColor: "transparent"
  }),
  menuList: (base) => ({
    ...base,

    "::-webkit-scrollbar": {
      width: "3px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "transparent"
    },
    "::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: '3px',
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555"
    }
  })
};