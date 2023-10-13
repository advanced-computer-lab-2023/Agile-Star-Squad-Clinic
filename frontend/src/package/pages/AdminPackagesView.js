import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PackageList from '../components/PackageList';
import './AdminPackagesView.css';

const AdminPackagesView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedPackages, setLoadedPackages] = useState();

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
  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPackages((prevPackages) =>
      prevPackages.filter((prevPackage) => prevPackage._id !== deletedPlaceId)
    );
  };

  return (
    <div>
      <div className="header">
        <h1>Packages</h1>
        <Link to="/addPackage">
          <button id ="addingbutton"className="btn btn-primary sm">Add Package</button>
        </Link>
      </div>
      {loadedPackages && (
        <PackageList items={loadedPackages} onDelete={placeDeletedHandler} />
      )}
    </div>
  );
};

export default AdminPackagesView;
