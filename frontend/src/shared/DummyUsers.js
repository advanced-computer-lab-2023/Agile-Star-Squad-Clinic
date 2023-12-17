const DUMMY_USERS = {
  guest: {
    role: 'guest',
  },
  admin: {
    _id: '652a5b90eac17dc9a6d5d3f4',
    role: 'admin',
  },
  patient: { _id: '65270df9cfa9abe7a31a4d88', role: 'patient' },
  doctor: { _id: '65270f436a48cd31d535b961', role: 'doctor' },
};

let DUMMY_USER = DUMMY_USERS.doctor;

const setUserRole = (role) => {
  switch (role.toLowerCase()) {
    case 'admin':
      DUMMY_USER = DUMMY_USERS.admin;
      break;
    case 'guest':
      DUMMY_USER = DUMMY_USERS.guest;
      break;
    case 'doctor':
      DUMMY_USER = DUMMY_USERS.doctor;
      break;
    default:
      DUMMY_USER = DUMMY_USERS.patient;
      break;
  }
};

export { DUMMY_USER, setUserRole };
