import React, { useState, useEffect } from 'react';
import FamilyList from '../components/FamilyList';
import AddFamilyForm from './AddFamily';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const PatientFamily = () => {
  const [familyMembers, setFamilyMembers] = useState(false);
  const [error, setError] = useState();
  const [listFamilyMember, setNewFamilyMember] = useState([]);
  const [isShowMemberForm, setShowMemberForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const sendRequest = async () => {
      console.log("SENDING REQUEST")
      setFamilyMembers(true);

      try {
        const response = await fetch("http://localhost:3000/patients/65270df9cfa9abe7a31a4d88/familyMembers");
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
    <div className="center">
    <Link to="/patient/login">
          <button id ="addingbutton"className="btn btn-primary">Patient Home</button>
        </Link>
      
      <h1>My Family Members</h1>
      <button className="btn btn-primary" onClick={showMemberForm}>Add Family Members</button>
      {isShowMemberForm && <AddFamilyForm exit={exitMemberModal} />}

      {listFamilyMember && <FamilyList items={listFamilyMember} />}
      
      
    </div>
  );

};

export default PatientFamily;
