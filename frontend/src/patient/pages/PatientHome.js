import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import DataTable from "../../shared/components/DataTable/DataTable";
import DoctorDetails from './DoctorDetails'
import PrescriptionDetails from "../../prescriptions/pages/PrescriptionDetails";
import { DUMMY_USER } from "../../shared/DummyUsers";

const PatientHome = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [doctorSearchNameValue, setDoctorSearchName] = useState("");
    const [doctorSearchSpecialtyValue, setDoctorSearchSpecialty] = useState("");
    const [doctorSearchDateValue, setDoctorSearchDate] = useState("");
    const [doctorSpecialtyFilter, setDoctorSpecialtyFilter] = useState("Select");
    const [specialtyFilters, setSpecialtyFilters] = useState([]);
    const [showDoctorDateFilter, setShowDoctorDateFilter] = useState(false);

    const [upcomingAppointments, setUpcomingAppointments] = useState([]);

    const [filteredAppointements, setFilteredAppointements] = useState([]);
    const [appointmentFilter, setAppointmentFilter] = useState('');
    const [appDateFilter, setAppDateFilter] = useState('');
    const [showAppDateFilter, setShowAppDateFilter] = useState(false);

    const [prescriptions, setPrescriptions] = useState([]);
    const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
    const [prescriptionFilter, setPrescriptionFilter] = useState("");
    const [prescriptionDoctors, setPrescriptionDoctors] = useState([]);
    const [prescDateFilter, setPrescDateFilter] = useState("");
    const [prescDoctorFilter, setPrescDoctorFilter] = useState("");
    const [showPrescDateFilter, setShowPrescDateFilter] = useState(false);
    const [showPrescDoctorFilter, setShowPrescDoctorFilter] = useState(false);
    const [showDoctor, setShowDoctor] = useState(false);
    const [showPresc, setShowPresc] = useState(false);

    const [selectedRow, setSelectedRow] = useState({});

    const patientId = DUMMY_USER._id;
    // const [patientDiscount, setPatientDiscount] = useState(0.0);

    useEffect(() => {
        fetchPatientAndDoctors();
        fetchUpcomingAppointments();
        fetchPrescriptions();
    }, [])

    useEffect(() => {
        setShowPrescDateFilter(false);
        setShowPrescDoctorFilter(false);
        if (prescriptionFilter === "select") {
            setFilteredPrescriptions(prescriptions)
        }
        else if (prescriptions.length != 0) {
            let newPrescriptions;
            switch (prescriptionFilter) {
                case "filled":
                    newPrescriptions = prescriptions.filter((presc) => presc.status == "Filled");
                    setFilteredPrescriptions(newPrescriptions);
                    break;
                case "unfilled":
                    newPrescriptions = prescriptions.filter((presc) => presc.status == "Unfilled");
                    setFilteredPrescriptions(newPrescriptions);
                    break;
                case "date":
                    setShowPrescDateFilter(true);
                    break;
                case "doctor":
                    setShowPrescDoctorFilter(true);
                    break;
                default:
                    break;
            }
        }
    }, [prescriptionFilter]);

    useEffect(() => {
        setShowAppDateFilter(false);
        if (appointmentFilter === 'select') {
            setFilteredAppointements(upcomingAppointments);
        } else
            if (upcomingAppointments.length != 0) {
                let newAppointements;

                switch (appointmentFilter) {
                    case 'date':
                        setShowAppDateFilter(true);
                        break;
                    default:
                        newAppointements = upcomingAppointments.filter(
                            (appoint) => appoint.status == appointmentFilter
                        );
                        setFilteredAppointements(newAppointements);

                        break;
                }
            }
    }, [appointmentFilter]);

    useEffect(() => {
        applySearch();
    }, [doctorSearchNameValue, doctorSearchSpecialtyValue, doctorSearchDateValue, doctorSpecialtyFilter]);

    const appointmentCols = [
        { field: "doctorName", headerName: "Doctor" },
        { field: "date", headerName: "Date", width: 240 },
        { field: "status", headerName: "Status" },
    ]

    const appointmentFilters = [
        <option value={'select'}>Select</option>,
        <option value={'date'}>By Date</option>,
        <option value={'vaccant'}>Vaccant</option>,
        <option value={'reserved'}>Reserved</option>,
        <option value={'passed'}>Passed</option>,
    ];

    const doctorCols = [
        { field: "username", headerName: "Username" },
        { field: "name", headerName: "Name" },
        { field: "speciality", headerName: "Specialty" },
        { field: "sessionPrice", headerName: "Session Price" },
    ]

    const prescriptionCols = [
        { field: "doctorName", headerName: "Doctor" },
        { field: "body", headerName: "Prescription", width: 300 },
        { field: 'status', headerName: "Status" }
    ]

    const prescriptionFilters = [
        <option value={'select'}>Select</option>,
        <option value={'date'}>By Date</option>,
        <option value={'doctor'}>By Doctor</option>,
        <option value={'filled'}>Filled</option>,
        <option value={'unfilled'}>Unfilled</option>
    ]

    const fetchPatientAndDoctors = async () => {
        await fetch(`http://localhost:3000/patients/${patientId}`).then(async (response) => {
            const json = await response.json();
            const patientJson = json.data.patient;
            if (patientJson.package) {
                return fetchDoctors(patientJson.package.doctorSessionDiscount / 100);
            } else {
                return fetchDoctors(0);
            }
        })
    }

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

    const fetchPrescriptions = () => {
        fetch("http://localhost:3000/patients/65270df9cfa9abe7a31a4d88/prescriptions").then(async (response) => {
            const json = await response.json();
            const prescriptionsJson = json.data.prescriptions;
            const prescDoctors = new Set();
            setPrescriptions(prescriptionsJson.map((prescription) => {
                return {
                    id: prescription["_id"],
                    ...prescription
                }
            }));
            setFilteredPrescriptions(prescriptionsJson.map((prescription) => {
                prescDoctors.add(prescription['doctorName']);
                return {
                    id: prescription["_id"],
                    ...prescription
                }
            }));
            const doctorsList = ["Select", ...Array.from(prescDoctors)]
            setPrescriptionDoctors(doctorsList);
        });
    }

    const fetchUpcomingAppointments = () => {
        fetch("http://localhost:3000/patients/65270df9cfa9abe7a31a4d88/upcomingAppointments").then(async (response) => {
            const json = await response.json();
            const appointmentsJson = json.data.appointments;
            setUpcomingAppointments(appointmentsJson.map((appointment) => {
                return {
                    id: appointment["_id"],
                    ...appointment
                }
            }));
            setFilteredAppointements(
                appointmentsJson.map((appointment) => {
                    return {
                        id: appointment['_id'],
                        ...appointment,
                    };
                })
            );
        });
    }

    const prescriptionDropdownHandler = (event) => {
        setPrescriptionFilter(event.target.value);
    }

    const appDropdownHandler = (event) => {
        setAppointmentFilter(event.target.value);
    };

    const prescDateFilterHandler = (event) => {
        const pickedDate = event.target.value;
        setPrescDateFilter(pickedDate);
        const newPrescriptions = prescriptions.filter((presc) => {
            const date = new Date(presc['dateOfCreation']);
            return pickedDate.toDateString() == date.toDateString();
        });
        setFilteredPrescriptions(newPrescriptions);
    }

    const appDateFilterHandler = (event) => {
        let pickedDate = event.target.value;
        setAppDateFilter(pickedDate);
        const newAppointements = upcomingAppointments.filter((appoint) => {
            const date = new Date(appoint['date']);
            pickedDate = new Date(pickedDate)
            return `${pickedDate.getFullYear()}-${pickedDate.getMonth()}-${pickedDate.getDay()}` ===
                `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
        });
        setFilteredAppointements(newAppointements);
    };

    const applyDateFilter = () => {
        const pickedISODate = new Date(doctorSearchDateValue).toISOString();
        const newDoctors = filteredDoctors.filter((doctor) => {
            const appointments = doctor.appointments;
            const isNotFree = appointments.some((app) => {
                let start = new Date(app.dateOfAppointment)
                const end = new Date(start.getTime() + 1000 * 60 * 60).toISOString() // ADDS 1 HOUR
                start = start.toISOString()
                return pickedISODate > start && pickedISODate < end;
            });
            return !isNotFree
        });
        setFilteredDoctors(newDoctors);
    }

    const prescDoctorDropdownHandler = (event) => {
        const chosenDoctor = event.target.value;
        setPrescDoctorFilter(chosenDoctor);
        if (chosenDoctor === "Select") {
            setFilteredPrescriptions(prescriptions)
        } else {
            const newPrescriptions = prescriptions.filter((presc) => presc['doctorName'] === chosenDoctor);
            setFilteredPrescriptions(newPrescriptions);
        }
    }

    const applySearch = () => {
        let newDoctors = [...doctors];
        if (doctorSearchNameValue !== "") {
            newDoctors = newDoctors.filter((doc) => doc.name.toLowerCase().includes(doctorSearchNameValue));
        }
        if (doctorSearchSpecialtyValue !== "") {
            newDoctors = newDoctors.filter((doc) => doc.speciality.toLowerCase().includes(doctorSearchSpecialtyValue));
        }
        if (doctorSpecialtyFilter !== "Select") {
            newDoctors = newDoctors.filter((doc) => doc.speciality === doctorSpecialtyFilter);
        }
        setFilteredDoctors(newDoctors);
        if (doctorSearchDateValue !== "") {
            applyDateFilter();
        }
    }

    const doctorSpecialtyDropdownHandler = (event) => {
        setDoctorSpecialtyFilter(event.target.value);
    }

    const clearDoctorDateFilter = () => {
        setDoctorSearchDate("");
    }

    const showDoctorModal = (selectedRow) => {
        setSelectedRow(selectedRow);
        setShowDoctor(true);
    };
    const showPrescModal = (selectedRow) => {
        setSelectedRow(selectedRow);
        setShowPresc(true);
    };
    const exitDoctorModal = () => {
        setShowDoctor(false);
    };
    const exitPrescModal = () => {
        setShowPresc(false);
    };

    return <div className="center">

        <Link to="/PatientFamily">
            <button id="addingbutton" className="formButtons">Family Members</button>
        </Link>

        <span>
            <h2>Upcoming Appointments</h2>
            <select value={appointmentFilter} onChange={appDropdownHandler}>
                {appointmentFilters}
            </select>
            {showAppDateFilter && (
                <input
                    type="date"
                    value={appDateFilter}
                    onChange={appDateFilterHandler}
                />
            )}
        </span>
        <DataTable columns={appointmentCols} rows={filteredAppointements} />

        <span>
            <h2>My Prescriptions</h2>
            <select value={prescriptionFilter} onChange={prescriptionDropdownHandler}>
                {prescriptionFilters}
            </select>
            {showPrescDateFilter && <input type="date" value={prescDateFilter} onChange={prescDateFilterHandler} />}

            {showPrescDoctorFilter && <select value={prescDoctorFilter} onChange={prescDoctorDropdownHandler}>
                {prescriptionDoctors.map((doc) => <option value={doc}>{doc}</option>)} </select>}

        </span>
        {showDoctor && (
            <DoctorDetails data={selectedRow} exit={exitDoctorModal} />
        )} {showPresc && (
            <PrescriptionDetails data={selectedRow} exit={exitPrescModal} />
        )}
        <DataTable columns={prescriptionCols} rows={filteredPrescriptions} onRowClick={showPrescModal} />

        <h2>Doctors</h2>
        <span>

            {/* {!showDoctorDateFilter &&
                

            } */}
            <div>
                <span>Search by Name </span>
                <input
                    type="text"
                    placeholder="Search"
                    value={doctorSearchNameValue}
                    onChange={(event) => { setDoctorSearchName(event.target.value) }}
                /></div>
            <span>Search by Specialty </span>

            <input
                type="text"
                placeholder="Search"
                value={doctorSearchSpecialtyValue}
                onChange={(event) => setDoctorSearchSpecialty(event.target.value)}
            />

            <div>
                <span>Availabilty Date </span>
                <input type="datetime-local" value={doctorSearchDateValue} onChange={(event) => { setDoctorSearchDate(event.target.value) }} />
                <button onClick={clearDoctorDateFilter}>Cancel</button>
            </div>


            <div>
                <span>Filter by Specialty </span>
                <select value={doctorSpecialtyFilter} onChange={doctorSpecialtyDropdownHandler}>
                    {specialtyFilters}
                </select>
                <button onClick={() => setDoctorSpecialtyFilter("Select")}>Cancel</button>
            </div>
            {/* <select value={doctorSearchGroup} onChange={doctorSearchGroupHandler}>
                {doctorSearchGroups}
            </select> */}
        </span>
        <DataTable columns={doctorCols} rows={filteredDoctors} onRowClick={showDoctorModal} />

    </div>;
}

export default PatientHome;