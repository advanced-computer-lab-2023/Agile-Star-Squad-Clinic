import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../images/login-image.png';
import img2 from '../images/Rectangle1.png'
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
            <img className='white-box' src={img2} alt='white-box' width='120%'></img>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Login;
