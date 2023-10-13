import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        <hr />
        <Link to="admin/home">
          <button type="button">Login as an Admin</button>
        </Link>
        <hr />
        <Link to="patient/register">
          <button type="button">Register as a Patient</button>
        </Link>
        <Link to="patient/login">
          <button type="button">Login as a Patient</button>
        </Link>
        <hr />
        <Link to="doctor/register">
          <button type="button">Register as a Doctor</button>
        </Link>
        <Link to="doctor/login">
          <button type="button">Login as a Doctor</button>
        </Link>
        <hr />
      </React.Fragment>
    );
  }
}

export default LandingPage;
