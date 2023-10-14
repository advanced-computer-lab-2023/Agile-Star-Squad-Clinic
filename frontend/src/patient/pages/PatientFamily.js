import React, { useState, useEffect } from 'react';
import FamilyList from '../components/FamilyList';
import AddFamilyForm from './AddFamily';

const PatientFamily = () => {
  const [familyMembers, setFamilyMembers] = useState(false);
  const [error, setError] = useState();
  const [listFamilyMember, setNewFamilyMember] = useState([]);
  const [isShowMemberForm, setShowMemberForm] = useState(false);
  

  useEffect(() => {
    const sendRequest = async () => {
      setFamilyMembers(true);

      try {
        const response = await fetch("http://localhost:3000/patients/65270df9cfa9abe7a31a4d88/familyMembers");
        const responseData = await response.json();
        setNewFamilyMember(responseData.data.members)

        if (!response.ok) {
          throw new Error(responseData.message); // Fix the message parameter
        }
        setNewFamilyMember(responseData);
      } catch (error) {
        console.log("HAS NOT FETCHED")
        setError(error.message);
      }
      setFamilyMembers(false);
    };

    if (!isShowMemberForm) {
      sendRequest();
    }
  }, [isShowMemberForm]);

  const showMemberForm = () => {
    setShowMemberForm(true);
  }

  const exitMemberModal = () => {
    setShowMemberForm(false);
  }

  return (
    <div
      className="center">
      <h1>My Family Members</h1>
      <button className="btn btn-primary" onClick={showMemberForm}>Add Family Members</button>
      {isShowMemberForm && <AddFamilyForm exit={exitMemberModal} />}

      {listFamilyMember && <FamilyList items={listFamilyMember} />}
    </div>
  );

};

export default PatientFamily;
