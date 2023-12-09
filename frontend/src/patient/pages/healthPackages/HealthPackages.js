import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PackageList from './PackageList';
import NavBar from '../../../shared/components/NavBar/NavBar';

import styles from './HealthPackages.module.css';

const HealthPackages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedPackages, setLoadedPackages] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/packages/');
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message); // Fix the message parameter
        }
        setLoadedPackages(responseData);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    sendRequest();
  }, []);

  const backButtonClickHandler = () => {
    navigate(-1);
  };

  const arrow = (
    <svg
      className={styles.backArrow}
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="14"
      viewBox="0 0 23 14"
      fill="none"
    >
      <path
        d="M1.59583 1.53345L11.9077 11.9807L22.2571 1.57064"
        stroke="black"
        strokeOpacity="0.6"
        strokeWidth="2.04827"
      />
    </svg>
  );

  return (
    <div className={styles.window}>
      <NavBar />
      <button className={styles.button} onClick={backButtonClickHandler}>
        {arrow}
      </button>
      <div className={styles.text}>
        <h2>Health Packages</h2>
        <p>
          Subscribe to one of our packages and enjoy a plethora of benefits and
          discounts
        </p>
      </div>
      {loadedPackages && <PackageList items={loadedPackages} />}
    </div>
  );
};

export default HealthPackages;
