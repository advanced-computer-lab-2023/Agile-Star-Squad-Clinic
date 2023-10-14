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
      setFamilyMembers(true);

      try {
        const response = await fetch(
          'http://localhost:3000/patients/65270df9cfa9abe7a31a4d88/familyMembers'
        );
        const responseData = await response.json();
        setNewFamilyMember(responseData.data.members);

        if (!response.ok) {
          throw new Error(responseData.message); // Fix the message parameter
        }
        setNewFamilyMember(responseData);
      } catch (error) {
        console.log('HAS NOT FETCHED');
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
  };

  const exitMemberModal = () => {
    setShowMemberForm(false);
  };

  const addFamilyHandler = (family) => {
    alert('added');
    setFamilyMembers(family);
  };

  return (
    <div className="center">
      <Link to="/patient/home">
        <button id="addingbutton" className="btn btn-primary">
          Patient Home
        </button>
      </Link>

      <h1>My Family Members</h1>
      <button className="btn btn-primary" onClick={showMemberForm}>
        Add Family Members
      </button>
      {isShowMemberForm && (
        <AddFamilyForm exit={exitMemberModal} onAddFamily={addFamilyHandler} />
      )}

      {listFamilyMember && <FamilyList items={listFamilyMember} />}
    </div>
  );
};

export default PatientFamily;
