import React, { useState, useEffect, useContext } from 'react';
import FamilyList from '../components/FamilyList';
import AddFamilyForm from './AddFamily';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserContext from '../../user-store/user-context';
import { toastMeSuccess } from '../../shared/components/util/functions';

const PatientFamily = () => {
  const [familyMembers, setFamilyMembers] = useState(false);
  const [error, setError] = useState();
  const [listFamilyMember, setNewFamilyMember] = useState([]);
  const [isShowMemberForm, setShowMemberForm] = useState(false);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    const sendRequest = async () => {
      setFamilyMembers(true);
      try {
        const response = await fetch(
          `http://localhost:3000/patients/${userCtx.userId}/familyMembers`,
          { credentials: 'include' },
        );
        const responseData = await response.json();
        setNewFamilyMember(responseData.data.members);

        if (!response.ok) {
          throw new Error(responseData.message); // Fix the message parameter
        }
        setNewFamilyMember(responseData);
      } catch (error) {
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
    toastMeSuccess('Member added');
    setFamilyMembers(family);
  };

  return (
    <div className="center">
      <Link to="/patient/account">
        <button id="addingbutton" className="btn btn-primary">
          Back
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
