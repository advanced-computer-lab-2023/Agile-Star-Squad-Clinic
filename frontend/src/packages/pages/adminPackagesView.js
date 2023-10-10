import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import PackageList from '../components/packageList'; 

const DUMMY_PLACES = [
  {
    
    name:"place.name",
    pricePerYear:"place.pricePerYear",
    doctorSessionDiscount:"place.doctorSessionDiscount",
    medicineDiscount:"place.medicineDiscount",
    familyMemberDiscount:"place.familyMemberDiscount",
    description:"place.description",
  },{
    
    name:"place.name2",
    pricePerYear:"place.pricePerYear2",
    doctorSessionDiscount:"place.doctorSessionDiscount2",
    medicineDiscount:"place.medicineDiscount2",
    familyMemberDiscount:"place.familyMemberDiscount2",
    description:"place.description2",
  }
];
function adminPackagesView() {
  // const [packages, setPackages] = useState([]);

  // useEffect(() => {
    
  //   axios.get('/api/packages') 
  //     .then((response) => {
        
  //       setPackages(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching packages', error);
  //     });
  // }, []);
  
  return (
    <div>
      <h1>Packages</h1>
      <PackageList items={DUMMY_PLACES} /> 
    </div>
  );
}

export default adminPackagesView;
