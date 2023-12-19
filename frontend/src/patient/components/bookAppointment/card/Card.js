import React from 'react';

import DoctorInfo from '../doctorInfo/DoctorInfo';
import DoctorBackground from '../doctorBackground/DoctorBackground';
import styles from './Card.module.css';

const Card = (props) => {
  const doctor = props.doctor;

  const svg = { width: '50', height: '50' };

  const patients = doctor.patients.length ?? 116;
  const patientsSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={svg.width}
      height={svg.height}
      viewBox="0 0 65 65"
      fill="none"
    >
      50
      <circle
        opacity="0.1"
        cx="32.4882"
        cy="32.4945"
        r="32.2445"
        fill="#96B7C7"
        stroke="#F5F5FF"
        stroke-width="0.5"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M32.3889 32.6186C44.8555 32.6186 50.8742 38.6363 49.3634 49.8917C49.2219 50.946 48.322 51.733 47.2581 51.733H17.5197C16.4558 51.733 15.5559 50.946 15.4144 49.8917C13.9036 38.6363 19.9223 32.6186 32.3889 32.6186ZM32.3889 13.5042C37.0815 13.5042 40.8856 17.3077 40.8856 21.9995C40.8856 26.6913 37.0815 30.4948 32.3889 30.4948C27.6963 30.4948 23.8922 26.6913 23.8922 21.9995C23.8922 17.3077 27.6963 13.5042 32.3889 13.5042Z"
        fill="#193842"
      />
    </svg>
  );

  const currentDate = new Date();
  const doctorDateOfCreation = new Date(doctor.dateOfCreation);
  const years =
    currentDate.getFullYear() - doctorDateOfCreation.getFullYear() ?? 4;
  const yearsSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={svg.width}
      height={svg.height}
      viewBox="0 0 66 65"
      fill="none"
    >
      <circle
        opacity="0.1"
        cx="32.558"
        cy="32.4945"
        r="32.2445"
        fill="#96B7C7"
        stroke="#F5F5FF"
        stroke-width="0.5"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M32.8767 17.2075C33.9098 17.2075 34.7473 18.0658 34.7473 19.1246C34.7473 20.1833 33.9098 21.0416 32.8767 21.0416L21.4778 21.0416C20.5738 21.0416 19.841 21.7925 19.841 22.7189L19.841 44.2853C19.841 45.2117 20.5738 45.9627 21.4778 45.9627H42.522C43.4259 45.9627 44.1588 45.2117 44.1588 44.2853V33.5021C44.1588 32.4434 44.9962 31.5851 46.0294 31.5851C47.0625 31.5851 47.8999 32.4434 47.8999 33.5021V44.2853C47.8999 47.3292 45.4922 49.7967 42.522 49.7967H21.4778C18.5076 49.7967 16.0998 47.3292 16.0998 44.2853V22.7189C16.0998 19.6751 18.5076 17.2075 21.4778 17.2075H32.8767ZM49.1583 15.6123C49.9649 16.2736 50.0957 17.4797 49.4504 18.3064L36.2651 35.6523C35.5687 36.5443 34.2703 36.618 33.4821 35.8102L26.0008 28.1434C25.2705 27.3948 25.2705 26.1813 26.0008 25.4327C26.7312 24.6841 27.9155 24.6842 28.6459 25.4327L34.6495 31.5853L46.5295 15.9116C47.1747 15.085 48.3517 14.951 49.1583 15.6123Z"
        fill="#193842"
      />
    </svg>
  );

  // const rating = doctor.rating ?? 4.9;
  // const ratingSvg = (
  //   <svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     width={svg.width}
  //     height={svg.height}
  //     viewBox="0 0 66 65"
  //     fill="none"
  //   >
  //     <path
  //       fill-rule="evenodd"
  //       clip-rule="evenodd"
  //       d="M28.7704 27.3611L21.5013 28.5913L21.3974 28.6127C20.3795 28.8606 19.9963 30.1116 20.7458 30.866L25.8873 36.0417L24.8374 43.1855L24.8264 43.2856C24.7503 44.311 25.8492 45.0561 26.8153 44.5914L33.4357 41.4062L40.056 44.5914L40.1499 44.6326C41.1232 45.0202 42.1872 44.228 42.0339 43.1855L40.9834 36.0417L46.1255 30.866L46.1967 30.789C46.8713 30.0031 46.4298 28.7707 45.3701 28.5913L38.1003 27.3611L34.6581 20.9775C34.1395 20.0159 32.7318 20.0159 32.2133 20.9775L28.7704 27.3611Z"
  //       fill="#193842"
  //     />
  //     <circle
  //       opacity="0.1"
  //       cx="33.4357"
  //       cy="32.4945"
  //       r="32.2445"
  //       fill="#96B7C7"
  //       stroke="#F5F5FF"
  //       stroke-width="0.5"
  //     />
  //   </svg>
  // );

  return (
    <div>
      <h1 className={styles.name}>{doctor.name}</h1>
      <img
        className={styles.image}
        src={
          doctor.image ??
          'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
        }
        alt="profile picture"
      />
      <div className={styles.doctorInfo}>
        <DoctorInfo
          className={styles.info}
          svg={patientsSvg}
          number={patients}
          description="Patients"
        />
        <DoctorInfo
          className={styles.info}
          svg={yearsSvg}
          number={years + '+'}
          description="Years"
        />
        {/* <DoctorInfo
          className={styles.info}
          svg={ratingSvg}
          number={rating}
          description="Rating"
        /> */}
      </div>
      <div className={styles.doctorBackground}>
        <DoctorBackground
          attribute={doctor.speciality}
          description="Speciality"
        />
        <DoctorBackground
          attribute={doctor.affiliation}
          description="Affiliation"
        />
        <DoctorBackground
          attribute={doctor.educationalBackground}
          description="Background"
        />
      </div>
    </div>
  );
};

export default Card;
