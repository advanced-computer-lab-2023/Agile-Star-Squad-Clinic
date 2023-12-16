import React, { useContext, useState, useEffect } from 'react';
import './NavBar.css';
import logo from '../../../logo.png';
import { Link } from 'react-router-dom';
import UserContext from '../../../user-store/user-context';

const NavBar = (props) => {
  const [walletAmount, setWalletAmount] = useState('');
  const userCtx = useContext(UserContext);

  useEffect(() => {
    getWallet();
  }, []);

  const getWallet = async () => {
    fetch(`http://localhost:3000/patients/${userCtx.userId}`, {
      credentials: 'include',
    }).then(async (response) => {
      const json = await response.json();
      setWalletAmount(json.data.patient.wallet);
    });
  };

  return (
    <div className="bodyN">
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex">
        <div className="container-fluid">
          <Link to={'/patient/home'} className="navbar-brand">
            <img
              src={logo}
              alt=""
              width="30"
              height="24"
              className="d-inline-block align-text-top"
              id="logo"
            />
            clinic
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">
                  Doctors
                </a>
              </li>
              <li className="nav-item">
                <Link to="/healthPackages" style={{ all: 'unset' }}>
                  <a className="nav-link " href="#">
                    Health Packages
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About us
                </a>
              </li>
            </ul>
          </div>
          <div className="d-flex mx-4">
            <div className="btn-group ">
              <a href="#" className="btn btn-white">
                Wallet: {walletAmount}
              </a>
              <Link to="/messages" style={{ all: 'unset' }}>
                <a href="#" className="btn btn-white">
                  Messages
                </a>
              </Link>
              <Link to="/meeting" style={{ all: 'unset' }}>
                <a href="#" className="btn btn-white">
                  Join Meeting
                </a>
              </Link>
              <Link to="/appointments" style={{ all: 'unset' }}>
                <a href="#" className="btn btn-white">
                  Appointments
                </a>
              </Link>
              <Link to={'/patient/account'}>
                <a href="#" className="btn btn-white" id="last">
                  Account
                </a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default NavBar;
