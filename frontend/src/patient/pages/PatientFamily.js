import React, { useState, useEffect } from 'react';
import FamilyList from '../components/FamilyList';

const PatientFamily = () => {
  const [familyMembers, setFamilyMembers] = useState(false);
  const [error, setError] = useState();
  const [listFamilyMember, setNewFamilyMember] = useState([]);
 

  useEffect(() => {
    const sendRequest = async () => {
      console.log("SENDING REQUEST")
      setFamilyMembers(true);
      
      try {
        const response = await fetch("http://localhost:3000/patients/6521b46c8e7a4831ac7e6dce/familyMembers");
        console.log("HAS FETCHED")
        const responseData = await response.json();
        setNewFamilyMember(responseData.data.members)
        console.log(responseData.data.members)
        
        if (!response.ok) {
          throw new Error(responseData.message); // Fix the message parameter
        }
        setNewFamilyMember(responseData);
      } catch (error) {
        console.log("HAS NOT FETCHED")
        // console.log("fekuhfefiheiufdu");
        // console.log(response === null);
        setError(error.message);
      }
      setFamilyMembers(false);
    };

    sendRequest();
  }, []);

  return (
    <div>
      <h1>My Family Members</h1>
      <button className="btn btn-primary">Add Family Members</button>

      {listFamilyMember && <FamilyList items={listFamilyMember} />}
    </div>
  );

};

export default PatientFamily;
