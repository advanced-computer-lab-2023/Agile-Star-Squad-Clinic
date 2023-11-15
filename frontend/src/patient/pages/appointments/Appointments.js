import { useEffect, useState } from "react";
import DataTable from "../../../shared/components/DataTable/DataTable";
import NavBar from "../../../shared/components/NavBar/NavBar";


const Appointments = () => {
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);

    const [filteredAppointements, setFilteredAppointements] = useState([]);
    const [appointmentFilter, setAppointmentFilter] = useState('');
    const [appDateFilter, setAppDateFilter] = useState('');
    const [showAppDateFilter, setShowAppDateFilter] = useState(false);

    useEffect(() => {
        fetchAppointments();
    }, []);

    useEffect(() => {
        setShowAppDateFilter(false);
        if (appointmentFilter === 'all') {
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

    const appointmentCols = [
        { field: "doctorName", headerName: "Doctor" },
        { field: "date", headerName: "Date", width: 240 },
        { field: "status", headerName: "Status" },
    ]

    const appointmentFilters = [
        <option value={'all'}>All</option>,
        <option value={'date'}>By Date</option>,
        <option value={'upcoming'}>Upcoming</option>,
        <option value={'completed'}>Completed</option>,
        <option value={'rescheduled'}>Rescheduled</option>,
        <option value={'cancelled'}>Cancelled</option>,
    ];

    const fetchAppointments = () => {
        fetch("http://localhost:3000/patients/65270df9cfa9abe7a31a4d88/appointments").then(async (response) => {
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

    const appDropdownHandler = (event) => {
        setAppointmentFilter(event.target.value);
    };

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

    return <>
    <NavBar/>
        <span>
            <h2>My Appointments</h2>
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
        </>;
}

export default Appointments;