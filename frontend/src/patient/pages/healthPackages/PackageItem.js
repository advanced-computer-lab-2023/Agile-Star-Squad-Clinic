import React from 'react';
import { Link } from 'react-router-dom';
import DiscountItem from './DiscountItem';

import styles from './PackageItem.module.css';

const PackageItem = (props) => {
  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.title}>{props.name}</h3>
        <h5 className={styles.description}>{props.description}</h5>
        <h2 className={styles.price}>{props.pricePerYear} LE</h2>
        <DiscountItem
          text={`${props.doctorSessionDiscount}% off doctor session`}
        />
        <DiscountItem text={`${props.medicineDiscount}% off any medicine`} />
        <DiscountItem
          text={`${props.familyMemberDiscount}% of Family Member subscriptions`}
        />
      </div>
      <div className={styles.container}>
        <Link
          className={styles.button}
          to={`/package/checkout`}
          state={{
            price: props.pricePerYear,
            name: props.name,
            description: props.description,
            id: props.id,
          }}
        >
          Purchase
        </Link>
      </div>
    </div>
  );
};

export default PackageItem;
