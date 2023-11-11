import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PackageList from './PackageList';

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

  const toPrevious = () => {
    navigate(-1);
  }

  return (
    <div>
      <div className="header">
     
        <h1>Packages</h1>
          <button id ="addingbutton" onClick={toPrevious} className="btn btn-primary sm">Back</button>
      </div>
      {loadedPackages && (
        <PackageList items={loadedPackages} />
      )}
    </div>
  );
};

export default HealthPackages;
