import React from 'react';

import styles from './DiscountItem.module.css';

const DiscountItem = (props) => {
  const svg = (
    <svg
      className={styles.svg}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="11"
      viewBox="0 0 16 11"
      fill="none"
    >
      <g clip-path="url(#clip0_1261_3070)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.2957 0.204347C16.3604 0.268958 16.4118 0.345714 16.4469 0.430218C16.4819 0.514722 16.5 0.605313 16.5 0.696803C16.5 0.788294 16.4819 0.878885 16.4469 0.963389C16.4118 1.04789 16.3604 1.12465 16.2957 1.18926L6.55781 10.9271C6.4932 10.9919 6.41645 11.0433 6.33194 11.0783C6.24744 11.1134 6.15685 11.1314 6.06536 11.1314C5.97387 11.1314 5.88328 11.1134 5.79877 11.0783C5.71427 11.0433 5.63751 10.9919 5.5729 10.9271L0.703982 6.05818C0.573374 5.92757 0.5 5.75043 0.5 5.56572C0.5 5.38102 0.573374 5.20387 0.703982 5.07327C0.83459 4.94266 1.01173 4.86928 1.19644 4.86928C1.38115 4.86928 1.55829 4.94266 1.6889 5.07327L6.06536 9.45112L15.3107 0.204347C15.3754 0.139572 15.4521 0.08818 15.5366 0.0531148C15.6211 0.0180496 15.7117 0 15.8032 0C15.8947 0 15.9853 0.0180496 16.0698 0.0531148C16.1543 0.08818 16.231 0.139572 16.2957 0.204347Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_1261_3070">
          <rect width="16" height="11" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
  return (
    <div className={styles.item}>
      {svg}
      <h6
        className={styles.text}
        style={props.isNavy ? { color: 'white' } : null}
      >
        {props.text}
      </h6>
    </div>
  );
};

export default DiscountItem;
