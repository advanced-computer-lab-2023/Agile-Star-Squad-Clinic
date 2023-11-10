import React from 'react';

import './DoctorBackground.css';

const DoctorBackground = (props) => {
  return (
    <div>
      <p className="description">{props.description}</p>
      <p className="attribute">{props.attribute}</p>
    </div>
  );
};

export default DoctorBackground;
