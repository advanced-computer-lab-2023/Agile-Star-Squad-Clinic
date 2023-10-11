import React, { useState, useEffect } from 'react';
import FamilyList from '../components/FamilyList';

const PatientFamily = () => {
  const [familyMembers, setFamilyMembers] = useState(false);
  const [error, setError] = useState();
  const [newFamilyMember, setNewFamilyMember] = useState();

  useEffect(() => {
    const sendRequest = async () => {
        setFamilyMembers(true);
      try {
        const response = await fetch("http://localhost:3000/:patientId/familyMembers");
        const responseData = await response.json();
        
        
        if (!response.ok) {
          throw new Error(responseData.message); // Fix the message parameter
        }
        setNewFamilyMember(responseData);
      } catch (error) {
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

      {newFamilyMember && <FamilyList items={newFamilyMember} />}
    </div>
  );

};

export default PatientFamily;
