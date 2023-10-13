import React, { useEffect, useState } from 'react';

import Card from '../../shared/components/Card/Card';
import FamilyMember from './FamilyMember';
import './FamilyList.css';


const FamilyList = props => {
  const [familyMembers, setFamilyMembers] = useState([]);

  useEffect(() =>{
    console.log(props?.items?.data?.members)
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
    
      {familyMembers?.map((place) => (
        <FamilyMember
          // key={place._id}
          name={place.name}
          NationalID={place.NationalID}
          age={place.age}
          gender={place.gender}
          patient={place.patient}
          relation={place.relation}
        />
      ))}
    </ul>
  );
};

export default FamilyList;
