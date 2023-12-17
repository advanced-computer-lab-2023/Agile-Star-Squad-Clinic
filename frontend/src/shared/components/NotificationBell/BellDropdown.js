import React, { useContext, useState, useEffect } from 'react';
import bell from './bell.png';
import UserContext from '../../../user-store/user-context';
import img from './white.png';

const BellDropdown = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const userCtx = useContext(UserContext);
    const userId = userCtx.userId;
    const [myNotifications, setMyNotifications] = useState([]);

    useEffect(() => {
        fetchMyNotifications();
    }, []);

    const fetchMyNotifications = () => {
        if (userCtx.role == 'patient') {
            fetch(`http://localhost:3000/patients/${userId}/notifications`, {
                credentials: 'include',
            }).then(async (response) => {
                const json = await response.json();
                const notificationsJson = json.data.notifications;
                setMyNotifications(
                    notificationsJson.map((notification) => ({ id: notification['_id'], ...notification }))
                );
            });
        }
        else if(userCtx.role == 'doctor'){
            fetch(`http://localhost:3000/doctors/${userId}/notifications`, {
                credentials: 'include',
            }).then(async (response) => {
                const json = await response.json();
                console.log(response);
                const notificationsJson = json.data.notifications;
                setMyNotifications(
                    notificationsJson.map((notification) => ({ id: notification['_id'], ...notification }))
                );
            });
        }
    };

    const deleteNotification = (notificationId) => {

        fetch(`http://localhost:3000/doctors/${userId}/notifications/${notificationId}`, {
            method: 'DELETE',
            credentials: 'include',
        }).then(() => {
            // Remove the deleted notification from the local state
            setMyNotifications((prevNotifications) => prevNotifications.filter(notification => notification.id !== notificationId));
        })
        .catch((error) => {
            console.error('Error deleting notification:', error);
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
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'cover',
                        padding: '10px',
                        width: '500%',
                        maxHeight: '200px', // Set the maximum height for scrolling
                        overflowY: 'auto', // Make the list scrollable
                    }}
                >
                    {/* Display fetched notifications dynamically */}
                    {userCtx.role === 'patient' || userCtx.role === 'doctor' ? (
                        <ul style={{ listStyle: 'none', padding: 0, width: '100%' }}>
                            {myNotifications.map((notification) => (
                                <li key={notification.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '0.25px solid var(--text-icons-faded-grey, #464a54)' }}>
                                    <span>{userCtx.role === 'patient' ? notification.patientMessage :notification.doctorMessage }</span>
                                    <span
                                        style={{ cursor: 'pointer', color: '#464a54', marginRight: '-5px', marginTop: '-5px' }}
                                        onClick={() => deleteNotification(notification._id)}
                                    >
                                        X
                                    </span>
                                    <hr></hr>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>You don't have permission to view notifications.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default BellDropdown;
