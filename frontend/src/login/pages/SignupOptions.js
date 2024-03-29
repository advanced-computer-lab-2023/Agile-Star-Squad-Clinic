import React, { useState } from "react";
import classes from "../components/signupOptions.module.css";
import logo from '../images/logo.png';
import doctor from '../images/doctor.png';

const SignupOptions = () => {
    const [buttonText, setButtonText] = useState('Join the platform');
    const [buttonColor, setButtonColor] = useState('#ccc');
    const [signupLink, setSignupLink] = useState('');
    const [isPatientSelected, setIsPatientSelected] = useState(false);
    const [isDoctorSelected, setIsDoctorSelected] = useState(false);

    const handlePatientClick = () => {
        setButtonText('Join as a patient');
        setButtonColor('#193842'); // Darker blue color
        setSignupLink('/patient/register');
        setIsPatientSelected(true);
        setIsDoctorSelected(false);
    };

    const handleDoctorClick = () => {
        setButtonText('Request to join as a doctor');
        setButtonColor('#193842'); // Darker blue color
        setSignupLink('/doctor/register');
        setIsPatientSelected(false);
        setIsDoctorSelected(true);
    };

    const handleButtonClick = () => {
        // Navigate to the selected page using history.push
        window.location.href = signupLink;
    };

    return <div>
        <div className={classes.logo}>
            <img src={logo} alt="Clinic Logo" />
        </div>
        <div className={classes.bigContainer}>
            <label className={classes.LabelTextStyle}>Join as a Patient or Doctor</label>

            <div
                className={`${classes.leftSmallContainer} ${isPatientSelected ? classes.selected : ''}`}
                onClick={handlePatientClick}>
                <p className={classes.textStyle}>
                    I am a patient, looking for professional help
                </p>
            </div>

            <div
                className={`${classes.rightSmallContainer} ${isDoctorSelected ? classes.selected : ''}`}
                onClick={handleDoctorClick}>
                <p className={classes.textStyle}>
                    I am a doctor, and I am happy to help
                </p>

            </div>
            <button
                className={classes.button}
                style={{ backgroundColor: isPatientSelected || isDoctorSelected ? buttonColor : '#ccc' }}
                disabled={!isPatientSelected && !isDoctorSelected}
                onClick={handleButtonClick}>
                {buttonText}
            </button>

            <div className={classes.p1}>
                <p className={classes.textStyle}>Already have an account?<a href="/login" className={classes.login}> Login</a></p>

            </div>
        </div>
    </div>
}

export default SignupOptions;