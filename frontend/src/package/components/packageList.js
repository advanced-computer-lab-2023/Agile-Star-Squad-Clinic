import React from 'react';

import Card from '../../shared/components/Card/Card';
import PackageItem from './packageItem';
import './packageList.css';

const PackageList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="package-list center">
        <Card>
          <h2> No Packages found maybe create one?</h2>
          <button>Add Package</button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="package-list">
      {props.items.map((place) => (
        <PackageItem
          key={place._id}
          name={place.name}
          pricePerYear={place.pricePerYear}
          doctorSessionDiscount={place.doctorSessionDiscount}
          medicineDiscount={place.medicineDiscount}
          familyMemberDiscount={place.familyMemberDiscount}
          description={place.description}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default PackageList;
