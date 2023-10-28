import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { setUserRole } from '../DummyUsers';
import NavBar from '../components/NavBar/NavBar';

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // let navigate = useNavigate();
    // const routeChangeLogin = () => {
    //     let LoginPath = newPath;
    //     navigate(LoginPath);
    // }
    // const routeChangeRegister = () => {
    //     let registerPath = newPath;
    //     navigate(registerPath);
    // }

    return (
      <React.Fragment>
        <NavBar></NavBar>
        <hr />
        <Link to="admin/home">
          <button type="button" onClick={() => setUserRole('admin')}>
            Login as an Admin
          </button>
        </Link>
        <hr />
        <Link to="patient/register">
          <button type="button">Register as a Patient</button>
        </Link>
        <Link to="patient/home">
          <button type="button" onClick={() => setUserRole('patient')}>
            Login as a Patient
          </button>
        </Link>
        <hr />
        <Link to="doctor/register">
          <button type="button">Register as a Doctor</button>
        </Link>
        <Link to="doctor/home">
          <button type="button" onClick={() => setUserRole('doctor')}>
            Login as a Doctor
          </button>
        </Link>
        <hr />
      </React.Fragment>
    );
  }
}

export default LandingPage;
