import { useEffect, useState } from "react";
import DataTable from "../../shared/components/DataTable/DataTable";

const PatientHome = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [doctorSearchField, setDoctorSearchField] = useState([]);
    const [doctorSearchGroup, setDoctorSearchGroup] = useState([]);

    const [upcomingAppointments, setUpcomingAppointments] = useState([]);

    const [prescriptions, setPrescriptions] = useState([]);
    const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
    const [prescriptionFilter, setPrescriptionFilter] = useState([]);
    const [prescriptionDoctors, setPrescriptionDoctors] = useState([]);
    const [prescDateFilter, setPrescDateFilter] = useState([]);
    const [prescDoctorFilter, setPrescDoctorFilter] = useState([]);
    const [showPrescDateFilter, setShowPrescDateFilter] = useState([]);
    const [showPrescDoctorFilter, setShowPrescDoctorFilter] = useState([]);


    const [selectedRow, setSelectedRow] = useState({});

    useEffect(() => {
        fetchUpcomingAppointments();
        fetchDoctors();
        fetchPrescriptions();
    }, [])

    useEffect(() => {
        let newPrescriptions;
        setShowPrescDateFilter(false);
        setShowPrescDoctorFilter(false);
        switch (prescriptionFilter) {
            case "filled":
                newPrescriptions = prescriptions.filter((presc) => presc.status == "Filled");
                break;
            case "unfilled":
                newPrescriptions = prescriptions.filter((presc) => presc.status == "Unfilled");
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
        setFilteredPrescriptions(newPrescriptions);
    }, [prescriptionFilter]);


    const appointmentCols = [
        { field: "username", headerName: "Username" },
        { field: "name", headerName: "Name" },
        { field: "email", headerName: "Email" },
        { field: "status", headerName: "Status" },
    ]

    const doctorCols = [
        { field: "username", headerName: "Username" },
        { field: "name", headerName: "Name" },
        { field: "specialty", headerName: "Specialty" },
        { field: "sessionPrice", headerName: "Session Price" },
    ]

    const prescriptionCols = [
        { field: "doctorName", headerName: "Doctor" },
        { field: "body", headerName: "Prescription" },
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
            setFilteredDoctors(doctors);
        });
    }

    const fetchPrescriptions = () => {
        fetch("http://localhost:3000/patients/65270df9cfa9abe7a31a4d88/prescriptions").then(async (response) => {
            const json = await response.json();
            const prescriptionsJson = json.data.prescriptions;
            const prescDoctors = new Set();
            setPrescriptions(prescriptionsJson.map((prescription) => {
                prescDoctors.add(prescription['doctor']);
                return {
                    id: prescription["_id"],
                    ...prescription
                }
            }));
            setFilteredPrescriptions(prescriptions);
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
        // Navigate to doctor info
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

    const prescDoctorDropdownHandler = (event) => {
        const chosenDoctor = event.target.value;
        setPrescDoctorFilter(chosenDoctor);
        const newPrescriptions = prescriptions.filter((presc) => presc['doctor'] === chosenDoctor);
        setFilteredPrescriptions(newPrescriptions);
    }

    const doctorSearchHandler = (event) => {
        const searchValue = event.target.value;
        setDoctorSearchField(searchValue);
        const newDoctors = doctors.filter((doctor) => doctor[searchGroup] === searchValue);
        setFilteredDoctors(newDoctors);
    };

    const doctorSearchGroupHandler = (event) => {
        setDoctorSearchGroup(event.target.value);
    };


    return <div className="center">

        <h2>Upcoming Appointments</h2>
        <DataTable columns={appointmentCols} rows={upcomingAppointments} />

        <span>
            <h2>My Prescriptions</h2>
            <select value={prescriptionFilter} onChange={prescriptionDropdownHandler}>
                {prescriptionFilters}
            </select>
            {showPrescDateFilter && <input type="date" value={prescDateFilter} onChange={prescDateFilterHandler}/>}

            {showPrescDoctorFilter && <select value={prescDoctorFilter} onChange={prescDoctorDropdownHandler}> 
            {prescriptionDoctors.map((doc) => <option value={doc}>{doc}</option>)} </select>}

        </span>
        <DataTable columns={prescriptionCols} rows={filteredPrescriptions} onRowClick={onPrescriptionClick} />

        <h2>Doctors</h2>
        <span>
        <input
          type="text"
          placeholder="Search"
          value={doctorSearchField}
          onChange={doctorSearchHandler}
        />
        <select value={doctorSearchGroup} onChange={doctorSearchGroupHandler}>
                {doctorSearchGroups}
            </select>
        </span>
        <DataTable columns={doctorCols} rows={filteredDoctors} onRowClick={onDoctorClick} />

    </div>;
}

export default PatientHome;