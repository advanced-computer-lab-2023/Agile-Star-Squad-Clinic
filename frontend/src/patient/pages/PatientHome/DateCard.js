import classes from "./DateCard.module.css";

const DateCard = (props) => {

    return <div className={classes.dateCard} style={props.isSelected ? {backgroundColor: "#96B7C7"} : {backgroundColor: "white"}}>
        <div className={classes.top}>
            <div className={classes.dayText}>Tue</div>
            <div className={classes.dayNum}>11</div>
        </div>
    </div>
}

export default DateCard;