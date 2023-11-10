import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.svg';
import img from '../images/login-image.png';
import img2 from '../images/Rectangle1.png';
import '../components/login.css';
import InputField from '../components/InputField/InputField';

const Login = () => {
  return (
    <body>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-7">
            <div className="logo">
              <img  src={logo} alt="logo" />
            </div>
            <img className="sama3a" src={img} alt="login"></img>
          </div>

          <div class="col-md-5" id="right-col">
            <div className='title'>
              <p><strong>Nice To See You Again</strong></p>
            </div>
            <div className='input'>
            <InputField />
            <InputField />
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Login;
