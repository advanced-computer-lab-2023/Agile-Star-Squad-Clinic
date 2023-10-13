import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import PackageList from "../components/packageList";
import './adminPackagesView.css'

const AdminPackagesView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedPackages, setLoadedPackages] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/packages/");
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
  const placeDeletedHandler = deletedPlaceId => {
    setLoadedPackages(prevPackages =>
      prevPackages.filter(responseData => responseData.id !== "652921afe42b08743e42f87f")
    );
  };
  
 
  return (
    <div>
      <div className="header">
      <h1>Packages</h1>
      <Link to = "/addPack">
      <button className="btn btn-primary sm">Add Package</button></Link>
      </div>
      {loadedPackages && <PackageList items={loadedPackages} onDeletePlace={placeDeletedHandler}/>}
    </div>
  );
};

export default AdminPackagesView;
