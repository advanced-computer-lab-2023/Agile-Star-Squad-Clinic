import { useNavigate } from "react-router-dom";
import { SideCard } from "./Account";
import classes from "./SubscriptionCard.module.css"
import silverImg from "../../../assets/patientAccount/silver.png"
import goldImg from "../../../assets/patientAccount/gold.png"
import platinumImg from "../../../assets/patientAccount/platinum.png"

const SubscriptionCard = (props) => {
    const navigate = useNavigate();
    let image, name, isActive, expiryDate;
    if (props.healthPackage != null) {
        name = props.healthPackage.name;
        isActive = props.cancellationDate == null;
        expiryDate = formatDate(props.expiringDate);
        switch (name) {
            case "Gold":
                image = goldImg;
                break;
            case "Platinum":
                image = platinumImg;
                break;
            default:
                image = silverImg;
                break;
        }
    }


    const toPackages = () => {
        navigate("/healthPackages");
    }
    return <SideCard>
        <div className={classes.sideCardTitle}>My Subscription</div>
        {props.healthPackage == null &&
            <div className="d-flex flex-column justify-content-center align-items-center h-100">
                <div className={classes.notSubscribed}>
                    You Are Not Subscribed To Any Packages
                </div>
                <div className="my-5"></div>
                <div className={classes.subscribeButton} onClick={toPackages}>
                    Subscribe Now
                </div>
            </div>
        }
        {props.healthPackage != null &&
            <div className="d-flex flex-column align-items-center h-100">
                <img className="mt-4 mb-3" width={160} src={image} />
                <div className={classes.notSubscribed}>
                    {name} Package
                </div>
                <div className="mt-2">Medicine Discount: {props.healthPackage.medicineDiscount}% off</div>
                <div>Family Discount: {props.healthPackage.familyMemberDiscount}% off</div>
                <div>Doctor Discount: {props.healthPackage.doctorSessionDiscount}% off</div>
                <div className="mt-3">{isActive ? `Renewal Date: ${expiryDate}` : `Expiry Date: ${expiryDate}`} </div>
                {isActive && <div className={classes.cancelButton} onClick={props.handleUnsubscribe}>
                    Cancel Subscription
                </div>}
            </div>
        }
    </SideCard>
}

export default SubscriptionCard;

const formatDate = (date) => {
    date = new Date(date);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }).format(date);
    return formattedDate;
  };