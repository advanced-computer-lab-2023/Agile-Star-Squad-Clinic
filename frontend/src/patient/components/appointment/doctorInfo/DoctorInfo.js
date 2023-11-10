import React from 'react';

import './DoctorInfo.css';

const DoctorInfo = (props) => {
  return (
    <div>
      {props.svg}
      <p className="number">{props.number}</p>
      <p className="description">{props.description}</p>
    </div>
  );
};

export default DoctorInfo;
