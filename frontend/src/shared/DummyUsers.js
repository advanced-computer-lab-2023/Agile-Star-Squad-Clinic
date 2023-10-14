const DUMMY_USERS = {
  guest: {
    role: 'guest',
  },
  admin: {
    _id: '652a5b90eac17dc9a6d5d3f4',
    role: 'admin',
  },
  patient: { _id: '6521fc7bb512c918531f7e0b', role: 'patient' },
  doctor: { _id: '65217eef62c9a70ae7636191', role: 'doctor' },
};

let DUMMY_USER = DUMMY_USERS.guest;

const setUserRole = (role) => {
  switch (role.toLowerCase()) {
    case 'admin':
      DUMMY_USER = DUMMY_USERS.admin;
      break;
    case 'patient':
      DUMMY_USER = DUMMY_USERS.patient;
      break;
    case 'doctor':
      DUMMY_USER = DUMMY_USERS.doctor;
      break;
    default:
      console.log('this is the default setUserRole, user set to guest');
      DUMMY_USER = DUMMY_USERS.guest;
      break;
  }
};

export { DUMMY_USER, setUserRole };
