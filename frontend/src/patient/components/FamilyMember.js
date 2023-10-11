import React from 'react';

import Card from '../../shared/components/Card/Card';
import './FamilyMember.css';

const FamilyMember = props => {
  return (
    <li className="family-member">
      <Card className="family-member__content">
        <div className="family-member__info">
          <p>Name: {props.name}%</p>
          <p>National ID: {props.NationalID}%</p>
          <p>Age: {props.age}%</p>
          <p>Gender: {props.gender}%</p>
          <p>Relation: {props.relation}</p>
        </div>
        <div className="family-member__actions">
        <button>Add Member</button>
        </div>
      </Card>
    </li>
  );
};

export default FamilyMember;
