import React, {useEffect} from 'react';

import Card from '../../shared/components/Card/Card';
import './FamilyMember.css';

const FamilyMember = ({
  name,
          NationalID,
          age,
          gender,
          patient,
          relation,
}) => {
  // useEffect(() => {
  //   console.log("PROPSSS: ", name)
  // }, [])
  return (
    <li className="family-member">
          <Card className="family-member__content">
            <div className="family-member__info">
              <p>Name: {name}</p>
              <p>National ID: {NationalID}</p>
              <p>Age: {age}</p>
              <p>Gender: {gender}</p>
              <p>Relation: {relation}</p>
            </div>
            <div className="family-member__actions">
            {/* <button>Add Member</button> */}
            </div>
          </Card>
    </li>
  );
};

export default FamilyMember;
