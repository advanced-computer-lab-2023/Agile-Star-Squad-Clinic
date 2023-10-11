import React, { useState, useEffect } from "react";
import PackageList from "../components/packageList";

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
  

  return (
    <div>
      <h1>Packages</h1>
      <button className="btn btn-primary">Add Packages</button>

      {loadedPackages && <PackageList items={loadedPackages} />}
    </div>
  );
};

export default AdminPackagesView;
