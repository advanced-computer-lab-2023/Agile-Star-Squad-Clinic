import React from 'react';
import Card from '../../shared/components/Card/Card';
import PackageItem from './PackageItem';
import './PackageList.css';

const PackageList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="package-list center">
        <Card>
          <h2>No Packages found, maybe create one?</h2>
          <button>Add Package</button>
        </Card>
      </div>
    );
  }

  return (
    <div className="package-container">
      {props.items.map((pkg) => (
        <div key={pkg._id} className="package-item">
          <PackageItem
            id={pkg._id}
            name={pkg.name}
            pricePerYear={pkg.pricePerYear}
            doctorSessionDiscount={pkg.doctorSessionDiscount}
            medicineDiscount={pkg.medicineDiscount}
            familyMemberDiscount={pkg.familyMemberDiscount}
            description={pkg.description}
            onDelete={props.onDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default PackageList;
