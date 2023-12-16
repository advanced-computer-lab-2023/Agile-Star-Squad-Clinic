import React, { useContext, useState, useEffect } from 'react';
import bell from './bell.png';
import UserContext from '../../../user-store/user-context';
import Carousel from 'react-bootstrap/Carousel';

const BellDropdown = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const userCtx = useContext(UserContext);
    const patientId = userCtx.userId;
    const [myNotifications, setMyNotifications] = useState([]);

    useEffect(() => {
        fetchMyNotifications();
    }, []);

    const fetchMyNotifications = () => {
        fetch(`http://localhost:3000/patients/${patientId}/notifications`, {
            credentials: 'include',
        }).then(async (response) => {
            const json = await response.json();
            console.log(response);
            const notificationsJson = json.data.notifications;
            setMyNotifications(
                notificationsJson.map((notification) => ({ id: notification['_id'], ...notification }))
            );
        });
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div style={{ position: 'relative' }}>
            <img
                src={bell}
                alt="Bell Icon"
                onClick={toggleDropdown}
                style={{ cursor: 'pointer', width: '65px' }}
            />
            {isDropdownOpen && (
                <div
                    style={{
                        position: 'absolute',
                        top: '100%', // Position the dropdown below the bell icon
                        left: 0,
                        border: '1px solid #ccc',
                        marginTop: '5px',
                        zIndex: 1, // Ensure the dropdown is above other content
                    }}
                >
                    {/* Display fetched notifications dynamically */}
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {myNotifications.map((notification) => (
                            <li key={notification.id}>{notification.patient}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default BellDropdown;
