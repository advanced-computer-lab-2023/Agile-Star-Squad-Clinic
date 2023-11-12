import React, { useState } from 'react';
import ReactDOM from 'react-dom';



const PatientAccountSettings = (props) =>{
    const fetchPackages = async() => {
        fetch("http://localhost:3000/patient/:id").then(async (response) => {
            const json = await response.json();
            const requestsJson = json.data.requests;
            setRequests((val) => [...val, ...requestsJson.map((request) => {
                return {
                    healthPackage: request['package']
                }
            })]);
        });
    }
    return(
       <body>
        <div> 
            <button onClick={fetchPackages}>View Health Package</button>
        </div>
        </body>
    )

    
}
export default PatientAccountSettings;

