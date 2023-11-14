// import React, { useState, useEffect } from 'react';
// import Card from '../../shared/components/Card/Card';
// import NavBar from '../../shared/components/NavBar/NavBar';
// import NewPackage from '../../package/pages/NewPackage';
// import Payment2 from '../components/payment/Payment';
// import { useLocation } from 'react-router-dom';

// const AddingInfo = () => {
//   const [showItem, setShowItem] = useState(false);
//   const [showDelivery, setShowDelivery] = useState(false);
//   const [message, setMessage] = useState('');
//   const [doctorSessionDiscount, setDoctorSessionDiscount] = useState('');
//   const [familyMemberDiscount, setfamilyMemberDiscount] = useState('');
//   const [medicineDiscount, setmedicineDiscount] = useState('');
//   const [doctorName, setDoctorName] = useState('');
//   const [appDate, setAppDate] = useState('');

//   const location = useLocation()
//   const stateData = location.state;

//   console.log(stateData);
//   useEffect(() => {
//     const fetchDataPackage = async () => {

//           try {
//         const response = await fetch(
//           `http://localhost:3000/packages/652b34559d864872c883a248`,

//         );
//         if (response.ok) {
//           const data = await response.json();

//         } else {
//           alert('Failed to fetch package data.');
//         }
//        }catch (error) {
//         alert('Network error: ' + error.message);
//       }}

//     fetchDataPackage();
//   }, []);

//   useEffect(() => {

//     const query = new URLSearchParams(window.location.search);

//     if (query.get('success')) {
//       setMessage('Order placed! You will receive an email confirmation.');
//     }

//     if (query.get('canceled')) {
//       setMessage(
//         "Order canceled -- continue to shop around and checkout when you're ready.",
//       );
//     }
//   }, []);
//   // setAppDate(DUMMY_APPOINTMENT[0].date.toUTCString())
//   return (
//     //
//     <div className="container">
//       <NavBar />
//       <br />
//       <br />
//       <div className="row  justify-content-evenly gx-5">
//         <div className="col card1">
//           <Card>
//             <Payment2  props={data} />
//           </Card>
//         </div>
//         <div className="col" id="card2">
//           <Card>
//             <h3>Order Summary</h3>
//             <div>
//               <img src="../../logo.svg" alt="doc_img"></img>
//               <p>{DUMMY_APPOINTMENT[0].date.toUTCString()}</p>
//             </div>
//             <p>{doctorName}</p>
//             <p>
//             Sub Total: {price}LE </p>
//             <div> {packagePresent &&
//             <p>
//             Package Discount : -{(doctorSessionDiscount/100)*price}LE
//             </p>} </div>
//             <div>Total : {price-((doctorSessionDiscount/100)*price)}</div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default AddingInfo;
