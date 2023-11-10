import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.svg';
import img from '../images/login-image.png';
import '../components/login.css';
import InputField from '../components/InputField/InputField';
import React, { Component } from 'react';
import Button from '../components/Button/Button';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    // You can handle form submission here, e.g., send the data to a server or perform client-side validation.
  };
  render() {
    return (
      <body>
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-7">
              <div className="logo">
                <img src={logo} alt="logo" />
              </div>
              <img className="sama3a" src={img} alt="login"></img>
            </div>

            <div class="col-md-5" id="right-col">
              <div className="title">
                <p>
                  <strong>Nice To See You Again</strong>
                </p>
              </div>
              <InputField
                type="text"
                placeholder="Username"
                onChange={this.handleUsernameChange}
                value={this.state.searchTerm}
              />
              <InputField
                type="password"
                placeholder="Password"
                onChange={this.handlePasswordChange}
                value={this.state.searchTerm}
              />
               <div className="forget-password">
                <a className="forget-pass" href="#">Forget Passowrd</a>
              </div>
              <Button onClick={this.handleSubmit} name="Sign In"></Button>
             
              <div className="create-account">
                <p>
                  Don't have an account? <a className="signup-link" href="#">Sign Up Now</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}
export default Login;
