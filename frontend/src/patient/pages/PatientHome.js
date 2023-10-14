import { useEffect, useState } from "react";
import DataTable from "../../shared/components/DataTable/DataTable";
import DoctorDetails from './DoctorDetails'
import PrescriptionDetails from "../../prescriptions/pages/PrescriptionDetails";

const PatientHome = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [doctorSearchNameValue, setDoctorSearchName] = useState("");
    const [doctorSearchSpecialtyValue, setDoctorSearchSpecialty] = useState("");
    const [doctorSearchDateValue, setDoctorSearchDate] = useState("");
    const [doctorSpecialtyFilter, setDoctorSpecialtyFilter] = useState("");
    const [showDoctorDateFilter, setShowDoctorDateFilter] = useState(false);

    const [upcomingAppointments, setUpcomingAppointments] = useState([]);

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

    useEffect(() => {
        fetchUpcomingAppointments();
        fetchDoctors();
        fetchPrescriptions();
    }, [])

    useEffect(() => {
        if (prescriptions.length != 0) {
            let newPrescriptions;
            setShowPrescDateFilter(false);
            setShowPrescDoctorFilter(false);
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
        applySearch();
    }, [doctorSearchNameValue, doctorSearchSpecialtyValue, doctorSearchDateValue, doctorSpecialtyFilter]);

    const appointmentCols = [
        { field: "doctorName", headerName: "Doctor" },
        { field: "date", headerName: "Date", width: 240 },
        { field: "status", headerName: "Status" },
    ]

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
        <option value={'date'}>By Date</option>,
        <option value={'doctor'}>By Doctor</option>,
        <option value={'filled'}>Filled</option>,
        <option value={'unfilled'}>Unfilled</option>
    ]
    const doctorSearchGroups = [
        <option value={'name'}>Name</option>,
        <option value={'speciality'}>Specialty</option>,
        <option value={'date'}>Date</option>,
    ]

    const fetchDoctors = () => {
        fetch("http://localhost:3000/doctors/").then(async (response) => {
            const json = await response.json();
            const doctorsJson = json.data.doctors;

            setDoctors(doctorsJson.map((doctor) => {
                const hourlyRate = doctor['hourlyRate'];
                const patientDiscount = 0.2;
                const sessionPrice = hourlyRate * 1.1 * (1 - patientDiscount);
                return {
                    id: doctor["_id"],
                    sessionPrice: sessionPrice,
                    ...doctor
                }
            }));
            setFilteredDoctors(doctorsJson.map((doctor) => {
                const hourlyRate = doctor['hourlyRate'];
                const patientDiscount = 0.2;
                const sessionPrice = hourlyRate * 1.1 * (1 - patientDiscount);
                return {
                    id: doctor["_id"],
                    sessionPrice: sessionPrice,
                    ...doctor
                }
            }));
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
            setPrescriptionDoctors(Array.from(prescDoctors));
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

        });
    }

    const onDoctorClick = (selectedRow) => {
        setSelectedRow(selectedRow);
    }

    const onPrescriptionClick = (selectedRow) => {
        setSelectedRow(selectedRow);
    }

    const prescriptionDropdownHandler = (event) => {
        setPrescriptionFilter(event.target.value);
    }

    const prescDateFilterHandler = (event) => {
        const pickedDate = event.target.value;
        setPrescDateFilter(pickedDate);
        const newPrescriptions = prescriptions.filter((presc) => {
            const date = new Date(presc['dateOfCreation']);
            return pickedDate.toDateString() == date.toDateString();
        });
        setFilteredPrescriptions(newPrescriptions);
    }
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
        const newPrescriptions = prescriptions.filter((presc) => presc['doctorName'] === chosenDoctor);
        setFilteredPrescriptions(newPrescriptions);
    }

    const applySearch = () => {
        let newDoctors = [...doctors];
        if (doctorSearchNameValue !== "") {
            newDoctors = newDoctors.filter((doc) => doc.name.toLowerCase().includes(doctorSearchNameValue));
        }
        if (doctorSearchSpecialtyValue !== "") {
            newDoctors = newDoctors.filter((doc) => doc.speciality.toLowerCase().includes(doctorSearchSpecialtyValue));
        }
        if (doctorSpecialtyFilter !== "") {
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

        <h2>Upcoming Appointments</h2>
        <DataTable columns={appointmentCols} rows={upcomingAppointments} />

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
            </div>
            {/* <select value={doctorSearchGroup} onChange={doctorSearchGroupHandler}>
                {doctorSearchGroups}
            </select> */}
        </span>
        <DataTable columns={doctorCols} rows={filteredDoctors} onRowClick={showDoctorModal} />

    </div>;
}

export default PatientHome;