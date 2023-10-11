import React from 'react';

import Card from '../../shared/components/Card/Card';
import FamilyMember from './FamilyMember';


const FamilyList = props => {
  if (props.items.length === 0) {
    return (
      <div className="family-list center">
        <Card>
          <h2>No Family Added</h2>
          <button>Add Family Member</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="family-list">
      {props.items.map(place => (
        <FamilyMember
          key={place.id}
          name={place.name}
          NationalID={place.NationalID}
          age={place.age}
          gender={place.gender}
          relation={place.relation}
        />
      ))}
    </ul>
  );
};

export default FamilyList;
