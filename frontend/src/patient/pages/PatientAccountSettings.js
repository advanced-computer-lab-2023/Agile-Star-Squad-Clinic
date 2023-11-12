import React, { useState,useEffect  } from 'react';
import ReactDOM from 'react-dom';



const PatientAccountSettings = (props) =>{
    const [healthPackage, setPackage] = useState(null);
    const [isButtonPressed, setButtonPressed1] = useState(false);

    const fetchPackages = async() => {
        fetch("http://localhost:3000/patients/65270df9cfa9abe7a31a4d88").then(async (response) => {
            const json = await response.json();
            setPackage(json.data.patient.package);
        });
        
    }
    const handelButtonclick = async () => {
        try {
            const response = await fetch("http://localhost:3000/patients/65270df9cfa9abe7a31a4d88", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            });
    
            if (response.ok) {
                setPackage(null);
                setButtonPressed1(true);
            } else {
                console.error("Failed to remove health package. Status:", response.status);
                const responseBody = await response.json();
                console.error("Response body:", responseBody);
            }
        } catch (error) {
            console.error("Error removing health package:", error);
        }
    };
    
        useEffect(() => {
            fetchPackages();
        }, []);

    return(
       <body>
        <div>
            <button onClick={handelButtonclick}>Unsbscribe from current package</button>
        </div>
        <div>{
            !isButtonPressed &&(
                <>
        <div>    
            {
                
                healthPackage!= null && 
                <div>{JSON.stringify(healthPackage)}</div>
            }
        </div>
        </>)}
        {isButtonPressed&&(
            <>
            <div>You unsubscribed successfully</div>
            </>
        )

        }
        </div>
        
        </body>
    )

    
}
export default PatientAccountSettings;


