import { useEffect, useState } from "react";
import { DUMMY_USER } from "../../shared/DummyUsers";
import { Form, useLocation, useNavigate } from 'react-router-dom';
import './BrowseDoctors.css';
import NavBar from '../../shared/components/NavBar/NavBar';
import filter from '../../2877849.png';
import searchImage from '../../search.png'; 
import arrowImage from '../../arrow.png'; 
import ophthalmology from '../../ophthalmology.png'; 
import dentist from '../../dentist.png'; 
import gas from '../../gas.png';
import neurology from '../../neurology.png';
import nutrition from '../../nutrition.png';
import dermatology from '../../dermatology.png'
import radiology from '../../radiology.png';
import doc1 from '../../doc1.png';
import email from '../../email.png';
import call from '../../call.png';
import appoint from '../../appoint.png';
import Card from '../../shared/components/Card/Card';


const BrowseDoctors = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedDropdown, setSelectedDropdown] = useState('filterBy');
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [doctorSearchNameValue, setDoctorSearchName] = useState("");
    const [doctorSearchSpecialtyValue, setDoctorSearchSpecialty] = useState("");
    const [doctorSearchDateValue, setDoctorSearchDate] = useState("");
    const [doctorSpecialtyFilter, setDoctorSpecialtyFilter] = useState("submit");
    const [specialtyFilters, setSpecialtyFilters] = useState([]);
    const [showDoctorDateFilter, setShowDoctorDateFilter] = useState(false);
    const patientId = DUMMY_USER._id;
    const [searchText, setSearchText] = useState('');
    const pickedISODate = new Date(doctorSearchDateValue).toLocaleString();
    const navigate = useNavigate();
    const location =useLocation();

  

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
    // Get the current pathname
    const currentPathname = location.pathname;

    // Use navigate to go to the new route
    navigate(`/patient/appointment/book/`, { state: { from: currentPathname } });
  };
 
  
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


    // const mockDoctors = [
    //     {
    //       id: 1,
    //       name: "Dr. John Smith",
    //       speciality: "Cardiology",
    //       hourlyRate: 100,
    //       affiliation: "City Hospital",
    //       mobileNumber: "123-456-7890",
    //       email: "john.smith@example.com",
    //       educationalBackground: "MD in Cardiology",
    //       appointments: [
    //         { dateOfAppointment: "2023-11-15T08:00" },
    //         { dateOfAppointment: "2023-11-10T10:30" },
    //         // Add more appointment objects as needed
    //       ],
    //     },
    //     {
    //       id: 2,
    //       name: "Dr. Sarah Johnson",
    //       speciality: "Dermatology",
    //       hourlyRate: 90,
    //       affiliation: "Dermatology Clinic",
    //       mobileNumber: "987-654-3210",
    //       email: "sarah.johnson@example.com",
    //       educationalBackground: "MD in Dermatology",
    //     },
    //     {
    //       id: 3,
    //       name: "Dr. Michael Lee",
    //       speciality: "Neurology",
    //       hourlyRate: 110,
    //       affiliation: "OrthoCare Hospital",
    //       mobileNumber: "555-123-4567",
    //       email: "michael.lee@example.com",
    //       educationalBackground: "MD in Orthopedics",
    //     },
    //     {
    //         id: 4,
    //         name: "Dr. Michael Lee",
    //         speciality: "Dentist",
    //         hourlyRate: 110,
    //         affiliation: "OrthoCare Hospital",
    //         mobileNumber: "555-123-4567",
    //         email: "michael.lee@example.com",
    //         educationalBackground: "MD in Orthopedics",
    //       },
    //       {
    //         id: 5,
    //         name: "Dr. Michael Lee",
    //         speciality: "Dentist",
    //         hourlyRate: 110,
    //         affiliation: "OrthoCare Hospital",
    //         mobileNumber: "555-123-4567",
    //         email: "michael.lee@example.com",
    //         educationalBackground: "MD in Orthopedics",
    //       },
          
     
    //   ];
      const applySearch = () => {
        let newDoctors = [...doctors];
      
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
      
        if (doctorSearchDateValue !== "") {
            
            newDoctors = applyDateFilter(newDoctors);
        }
      
        setFilteredDoctors(newDoctors);
      };
      
      
      const applyFilterBySpecialty = (specialty) => {
        //console.log("Clicked on specialty:", specialty);
        setDoctorSpecialtyFilter(specialty);
      
        // Filter doctors based on the selected specialty
        const filteredDoctors = doctors.filter((doctor) => doctor.speciality === specialty);

        setFilteredDoctors(filteredDoctors);
      };
      
      const applyDateFilter = (doctorList) => {
        console.log("doctorSearchDateValue:", doctorSearchDateValue);
        const pickedISODate = new Date(doctorSearchDateValue);
        console.log("pickedISODate:", pickedISODate);
      
        const newDoctors = doctorList.filter((doctor) => {
          console.log("Doctor:", doctor);
          const appointments = doctor.appointments;
          console.log("Appointments:", appointments);
          const isNotFree = appointments.some((app) => {
            let start = new Date(app.dateOfAppointment);
            const end = new Date(start);
            end.setHours(end.getHours() + 1); // ADDS 1 HOUR
            console.log("Start:", start);
            console.log("End:", end);
            console.log("Comparison:", pickedISODate > start && pickedISODate < end);
            return pickedISODate > start && pickedISODate < end;
          });
          return !isNotFree;
        });
      
        console.log("Filtered Doctors:", newDoctors);
        return newDoctors;
      };
      
      
      
      
      
    

useEffect(() => {
    // Set doctors to the mock data
    fetchDoctors();
  }, []);

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
    //    setDoctors(mockDoctors);
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
    //   setFilteredDoctors(mockDoctors);
  });
}


  return (
    <div>
      <NavBar />
      <h1 className="Browse-Doctors_title">BROWSE DOCTORS</h1>
       <form className="Browse-Doctors_search" onSubmit={handleSearch}>
      <h2 className="Browse-Doctors_speciality">Speciality</h2>
      <div className="input-container">
  

        <img
          src={searchImage}
          alt="Search"
          width="25"
          height="20"
          className="search-icon_image"
        />
     
        <input
          type="text"
          placeholder=""
          className="search-input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

<div className="dropdown-container">
          {!showDropdown && (
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
          )}

          {showDropdown && (
            <div className="dropdown-list">
               <select
                value={selectedDropdown}
                onChange={handleDropdownChange}
              >
                <option value="filterBy" disabled>
                  Filter by
                </option>
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
      <input
    type="datetime-local"
    className="input-avail"
    value={doctorSearchDateValue}
    onChange={(event) => setDoctorSearchDate(event.target.value)}
/>
      <button onClick={() => setShowDoctorDateFilter(false)}>Apply</button>
    </div>
  ) : (
    <button onClick={() => setShowDoctorDateFilter(true)}>
      Filter by Availability Date
    </button>
  )}
</div>
      <div className="container-fluid d-flex mx-2">
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
