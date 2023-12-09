import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PackageList from '../components/PackageList';
import './AdminPackagesView.css';
import AdminNavBar from '../../admin/components/AdminNavBar';
import AddIcon from '../../admin/Add.png'; // Import your Add icon

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
          throw new Error(responseData.message);
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
      <AdminNavBar />
      <div className="header">
        <h1 className="package-title">Manage Health Packages</h1>

        <Link to="/addPackage">
          <button id="addingbutton" className="btn btn-primary sm">
            Add
            <img
              src={AddIcon} // Use the imported Add icon
              alt="Add"
              style={{ width: '18px', height: '18px', marginLeft: '5px', flexShrink: 0 }}
            />
          </button>
        </Link>
      </div>
      {loadedPackages && (
        <PackageList items={loadedPackages} onDelete={placeDeletedHandler} />
      )}
    </div>
  );
};

export default AdminPackagesView;
