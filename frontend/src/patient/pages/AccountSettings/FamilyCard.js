import { SideCard } from './Account';
import { useEffect, useState } from 'react';
import classes from "./FamilyCard.module.css";
import closeImg from '../../../assets/patientAccount/close.png';

const FamilyCard = (props) => {
    const [tab, setTab] = useState(0);
    const [name, setName] = useState("");
    const [nationalId, setNationalId] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [relation, setRelation] = useState("");
  
    const familyMembers = [
      {
        name: "Kareem",
        relation: "Brother",
        gender: "Male",
        age: "20"
      }  
    ];

    const deleteMember = (member) => {

    }
  
    const getTabStyle = (index) => {
      if (index == tab) {
        return `${classes.tabText} ${classes.activeTab}`;
      }
      return classes.tabText;
    }

    const getMemberCards = () => {
        return <div className={classes.wrapper}>
        {familyMembers.map(member => <div className={classes.memberContainer}>
          <div style={{height: "85px", width: "85px", borderRadius:"50%", backgroundColor: "lightblue"}}/>
          <div className='d-flex flex-column ms-3 py-2 justify-content-between'>
            <div className={classes.memberName}>{member.name}</div>
            <div className={classes.memberDescription}>{member.relation}</div>
            <div className={classes.memberDescription}>{member.gender} | {member.age}</div>
          </div>
          <div className={classes.deleteButton} >
          <img onClick={() => {deleteMember(member)}} src={closeImg} height={20}/>
            </div>
        </div>)}
      </div>;
    }

    const getForm = () => {
      const onSubmit = () => {
        // TODO Submit to backend
      }

      return <form className={classes.formWrapper}>
        <div className='w-100'>
          <div className={classes.formTitle}>Member Details</div>
          <div className={classes.inputRow}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder='Full Name' required/>
            <input value={nationalId} onChange={(e) => setNationalId(e.target.value)}  placeholder='National ID' required/>
          </div>
          <div className={classes.inputRow}>
            <input value={age} onChange={(e) => setAge(e.target.value)}  placeholder='Age' required/>
            <input value={gender} onChange={(e) => setGender(e.target.value)}  placeholder='Gender' required/>
          </div>
          <div className={classes.inputRow}>
            <input value={relation} onChange={(e) => setRelation(e.target.value)}  placeholder='Relation To Parent' required/>
          </div>
        </div>
        <div className='mt-4 w-100'>
          <div className={classes.formTitle}>Link Account (Optional)</div>
          <div className={classes.inputRow}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
          </div>
          <div className={classes.inputRow}>
            <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}  placeholder='Phone Number'/>
          </div>
        </div>
        <button type="submit" onClick={onSubmit} className={classes.addButton}>Add Member</button>
      </form>
    }
  
    return <SideCard>
      <div className={classes.sideCardTitle}>My Family</div>
      <div className={classes.tabs}>
          <div className={getTabStyle(0)} onClick={() => setTab(0)}>My Family {tab == 0 && <hr className={classes.activeTab}/>}</div>
          <div className={getTabStyle(1)} onClick={() => setTab(1)}>Add Family Member {tab == 1 && <hr className={classes.activeTab}/>}</div>
      </div>
      {tab == 0 && getMemberCards()}
      {tab == 1 && getForm()}
    </SideCard>;
  }

  export default FamilyCard;