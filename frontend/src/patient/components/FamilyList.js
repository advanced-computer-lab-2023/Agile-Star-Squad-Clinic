import React, { useEffect, useState } from 'react';

import Card from '../../shared/components/Card/Card';
import FamilyMember from './FamilyMember';
import './FamilyList.css';

const FamilyList = (props) => {
  const [familyMembers, setFamilyMembers] = useState([]);

  useEffect(() => {
    setFamilyMembers(props?.items?.data?.members);
  }, [props]);

  if (props?.items?.data?.members?.length === 0) {
    return (
      <div className="family-list center">
        <Card>
          <h2>No Family Added</h2>
          {/* <button>Add Family Member</button> */}
        </Card>
      </div>
    );
  }

  return (
    <ul className="family-list">
      {familyMembers?.map((member) => (
        <FamilyMember
          key={member._id}
          name={member.name}
          NationalID={member.NationalID}
          age={member.age}
          gender={member.gender}
          patient={member.patient}
          relation={member.relation}
          memberPatientId={member.memberPatientId}
        />
      ))}
    </ul>
  );
};

export default FamilyList;
