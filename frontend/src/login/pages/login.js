import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../images/login-image.png';
import '../components/login.css';

const Login = () => {
  return (
    <body>
      <div class="container">
        <div class="row">
          <div class="col-md-7">
            <img className ='sama3a' src={img} alt='login' width='120%'></img>
          </div>
            
          <div class="col-md-5">
            <p>hello</p>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Login;
