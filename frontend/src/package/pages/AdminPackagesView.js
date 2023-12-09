import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PackageList from '../components/PackageList';
import './AdminPackagesView.css';
import AdminNavBar from '../../admin/components/AdminNavBar';
import AddIcon from '../../admin/Add.png'; // Import your Add icon
import Card from '../../shared/components/Card/Card';
import NewPackage from './NewPackage';

const AdminPackagesView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedPackages, setLoadedPackages] = useState();
  const [showAddForm, setShowAddForm] = useState(false);

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
  
  const toggleAddForm = () => {
    setShowAddForm((prevShowAddForm) => !prevShowAddForm);
  };

  return (
    <div>
      <AdminNavBar />
      <div className="header">
        <h1 className="package-title">Manage Health Packages</h1>

        <button id="addingbutton" className="btn btn-primary sm" onClick={toggleAddForm}>
          Add
          <img
            src={AddIcon}
            alt="Add"
            style={{ width: '18px', height: '18px', marginLeft: '5px', flexShrink: 0 }}
          />
        </button>
      </div>
      {showAddForm && (
        <div className="overlay">
          <Card className="new-package-card">
            <NewPackage/>
            <button className="btn btn-primary sm" onClick={toggleAddForm}>
              Cancel
            </button>
          </Card>
        </div>
      )}
      {loadedPackages && (
        <PackageList items={loadedPackages} onDelete={placeDeletedHandler} />
      )}
    </div>
  );
};

export default AdminPackagesView;
