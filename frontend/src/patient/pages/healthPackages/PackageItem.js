import React from 'react';
import { Link } from 'react-router-dom';
import DiscountItem from './DiscountItem';

import styles from './PackageItem.module.css';

const PackageItem = (props) => {
  return (
    <div
      className={styles.card}
      style={props.isNavy ? { backgroundColor: '#252B42', transform: "scale(1.1)" } : null}
    >
      <div>
        <h3
          className={styles.title}
          style={props.isNavy ? { color: 'white' } : null}
        >
          {props.name}
        </h3>
        <h5
          className={styles.description}
          style={props.isNavy ? { color: 'white' } : null}
        >
          {props.description}
        </h5>
        <div>
          <h2 className={styles.price}>{props.pricePerYear}</h2>
          <div className={styles.priceDiv}>
            <h4 className={styles.currency}>L.E.</h4>
            <p className={styles.recurrence}>per year</p>
          </div>
        </div>
        <DiscountItem
          text={`${props.doctorSessionDiscount}% off doctor session`}
          isNavy={props.isNavy}
        />
        <DiscountItem
          text={`${props.medicineDiscount}% off any medicine`}
          isNavy={props.isNavy}
        />
        <DiscountItem
          text={`${props.familyMemberDiscount}% of Family Member subscriptions`}
          isNavy={props.isNavy}
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
