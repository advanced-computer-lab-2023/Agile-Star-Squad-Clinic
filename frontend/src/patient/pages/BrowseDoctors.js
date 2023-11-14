import { useEffect, useState } from "react";
import { Form, useLocation, useNavigate } from 'react-router-dom';
import './BrowseDoctors.css';
import searchImage from '../../assets/patientHomepage/search.png';
import arrowImage from '../../assets/patientHomepage/backarrow.png';
import ophthalmology from '../../assets/patientHomepage/ophthalmology.png';
import dentist from '../../assets/patientHomepage/dentist.png';
import gas from '../../assets/patientHomepage/gas.png';
import neurology from '../../assets/patientHomepage/neurology.png';
import nutrition from '../../assets/patientHomepage/nutrition.png';
import dermatology from '../../assets/patientHomepage/dermatology.png'
import radiology from '../../assets/patientHomepage/radiology.png';
import doc1 from '../../assets/patientHomepage/doc1.png';
import email from '../../assets/patientHomepage/email.png';
import call from '../../assets/patientHomepage/call.png';
import appoint from '../../assets/patientHomepage/appoint.png';


const BrowseDoctors = () => {
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
  const handleBackButtonClick = () => {
    // Reset all filters to their initial state
    setDoctorSearchName('');
    setDoctorSearchSpecialty('');
    setDoctorSearchDate('');
    setDoctorSpecialtyFilter('Select');
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
  }, [doctorSearchNameValue, doctorSearchSpecialtyValue, doctorSearchDateValue, doctorSpecialtyFilter]);


  const applySearch = () => {
    let newDoctors = [...doctors];

    // Apply other filters first
    if (doctorSearchNameValue !== "" && selectedDropdown === "name") {
      newDoctors = newDoctors.filter((doc) =>
        doc.name.toLowerCase().includes(doctorSearchNameValue.toLowerCase())
      );
    }

    if (doctorSearchSpecialtyValue !== "" && selectedDropdown === "specialty") {
      newDoctors = newDoctors.filter((doc) =>
        doc.speciality.toLowerCase().includes(doctorSearchSpecialtyValue.toLowerCase())
      );
    }

    if (doctorSpecialtyFilter !== "Select") {
      newDoctors = newDoctors.filter((doc) => doc.speciality === doctorSpecialtyFilter);
    }

    // Apply date filter last
    if (doctorSearchDateValue !== "") {
      newDoctors = applyDateFilter(newDoctors);
    }

    setFilteredDoctors(newDoctors);
  };


  const applyFilterBySpecialty = (specialty) => {
    setDoctorSpecialtyFilter(specialty);

    // Filter doctors based on the selected specialty
    const filteredDoctors = doctors.filter((doctor) => doctor.speciality === specialty);

    setFilteredDoctors(filteredDoctors);
  };

  const applyDateFilter = (doctorList) => {
    const pickedISODate = new Date(doctorSearchDateValue).toISOString();
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

  return (
    <div className="position-relative" style={{ minHeight: "1200px" }}>
      <h1 className="Browse-Doctors_title">BROWSE DOCTORS</h1>
      <form className="Browse-Doctors_search" onSubmit={handleSearch}>
        <h2 className="Browse-Doctors_speciality">Speciality</h2>
        <button className="back-button" onClick={handleBackButtonClick}>
          <img src={arrowImage} alt="" className="back-image"
            width="54"
            height="54" />
        </button>
        <div className="input-container">
          <img
            src={searchImage}
            alt="Search"
            width="25"
            height="18"
            className="search-icon_image"
          />

          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchText}
            onChange={(e) => { setSearchText(e.target.value); handleSearch(e); }}
          />

          <div className="dropdown-container">
            {/* {!showDropdown && (
            <button
              type="button"
              className="filter-icon-button"
              onClick={() => setShowDropdown(true)}
            >
              <img
                src={filter}
                alt=""
                width="30"
                height="24"
                className="filter-icon-image"
                id="filter"
              />
            </button>
          )} */}

            {true && (
              <div className="dropdown-list">
                <select
                  value={selectedDropdown}
                  onChange={handleDropdownChange}
                >
                  <option value="name">Name</option>
                  <option value="specialty">Specialty</option>
                </select>
              </div>
            )}
          </div>

        </div>

      </form>

      <div className="filter-button-container">
        {showDoctorDateFilter ? (
          <div className="appointments">
            <span>Availability Date </span>
            <input type="datetime-local"
              value={doctorSearchDateValue}
              onChange={(event) => { setDoctorSearchDate(event.target.value) }} />
            <button onClick={() => setShowDoctorDateFilter(false)}>Apply</button>
          </div>
        ) : (
          <button onClick={() => setShowDoctorDateFilter(true)}>
            Filter by Availability Date
          </button>
        )}
      </div>
      <div className="container-fluid container-fluid1 d-flex mx-2 mb-5">
        <div className="row align-items-center">
          <div className="col" onClick={() => applyFilterBySpecialty('Ophthalmology')}>
            <img src={ophthalmology} alt="" className="icons" />
            <p className="text">Ophthalmology</p>
          </div>
          <div className="col" onClick={() => applyFilterBySpecialty('Dentist')}>
            <img src={dentist} alt="" className="icons" />
            <p className="text">Dentist</p>
          </div>
          <div className="col" onClick={() => applyFilterBySpecialty('Gastroenterology')}>
            <img src={gas} alt="" className="icons" />
            <p className="text">Gastroenterology</p>
          </div>
          <div className="col" onClick={() => applyFilterBySpecialty('Neurology')}>
            <img src={neurology} alt="" className="icons" />
            <p className="text">Neurology</p>
          </div>
          <div className="col" onClick={() => applyFilterBySpecialty('Radiology')}>
            <img src={radiology} alt="" className="icons" />
            <p className="text">Radiology</p>
          </div>
          <div className="col" onClick={() => applyFilterBySpecialty('Nutrition')}>
            <img src={nutrition} alt="" className="icons" />
            <p className="text">Nutrition</p>
          </div>
          <div className="col" onClick={() => applyFilterBySpecialty('Dermatology')}>
            <img src={dermatology} alt="" className="icons" />
            <p className="text">Dermatology</p>
          </div>


        </div>

      </div>

      <div className="container">
        <div className="row">
          {filteredDoctors.length === 0 ? (
            console.log("Filtered Doctors:pew", filteredDoctors)
          ) : (
            filteredDoctors.map((doctor) => (
              <div className="col-12 col-md-4" key={doctor.id}>
                <div className="doctors" onClick={() => handleDoctorClick(doctor)}>
                  <p className="name">{doctor.name}</p>
                  <p className="spec"> {doctor.speciality}</p>
                  <p className="rate"> ${doctor.hourlyRate}/session</p>
                  <p className="affil">{doctor.affiliation}</p>

                  <div className="right-section">
                    <div className="mobile">
                      <img
                        src={call}
                        alt="call"
                        width="25" // Adjust the width as needed
                        height="20" // Adjust the height as needed
                        className="comm-icon"
                      />
                      <p>{doctor.mobileNumber} </p>
                    </div>
                    <div className="appointment">
                      <img
                        src={appoint}
                        alt="appoint"
                        width="25" // Adjust the width as needed
                        height="20" // Adjust the height as needed
                        className="comm-icon"
                      />
                      <p>Make an appointment </p>
                    </div>
                    <div className="email">
                      <img
                        src={email}
                        alt="email"
                        width="25" // Adjust the width as needed
                        height="20" // Adjust the height as needed
                        className="comm-icon"
                      />
                      <p>{doctor.email} </p>
                    </div>
                    <p className="edu">{doctor.educationalBackground}</p>
                  </div>
                  <div className="doc1">
                    <img
                      src={doc1}
                      alt="doc1"
                      width="105px"
                      height="101px"
                      className="doc-icon"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>


  );
};

export default BrowseDoctors;
