import ReactDOM from 'react-dom';
import classes from './requestsStyle.module.css';
import doctorImage from './051_Doctor 1.png';
import ximage from './x.png';
import logo from './logo.png';
import { useContext } from 'react';
import UserContext from '../user-store/user-context';
import { useNavigate } from 'react-router-dom';


const RejectedRequest = (props)=> {
    const userCtx = useContext(UserContext);
    const navigate = useNavigate();
    const toLogin = () => {
        userCtx.logout();
        navigate('/');
    }
    return(
   
        <body className={classes.background}>
        <div className='d-flex'>
        <div className={`${classes.mainBackground} col-5`}>
            <div className={classes.logo}>
              <img src={logo} alt="Clinic Logo"/>  
            </div>
            <img src={doctorImage} alt="Doctor Image" className={classes.doctorImage} /> 
        </div>
        
        <div className={`${classes.secondBackground} col-7`}>
         {
          <div className={classes.customText}>
            <p className={classes.p1}>ACCESS REQUEST DENIED</p>
            <p className={classes.p2}>Access Denied</p>
            <img src={ximage} alt="BIG X"/>  
            <div>
            <button className={classes.button} onClick={toLogin}>Back to Login</button>
            </div>
          </div>
          

         }
         </div>
        
        </div>
     
        </body>
    )
}
export default RejectedRequest;