import React, { useState, useEffect } from 'react';
import storage from '../../index';
import { getDownloadURL, ref, uploadBytesResumable, listAll } from "firebase/storage";
import ReactDOM from 'react-dom';



const PatientAccountSettings = (props) => {
    const [healthPackage, setPackage] = useState(null);
    const [isButtonPressed, setButtonPressed] = useState(false);
    const [healthRecord, setHealthRecord] = useState("");

    const onHealthRecordChange = (file) => {
        setHealthRecord(file.target.files[0]);
    }


    const fetchPackages = async () => {
        fetch("http://localhost:3000/patients/65270df9cfa9abe7a31a4d88").then(async (response) => {
            const json = await response.json();
            setPackage(json.data.patient.package);
        });

    }
    const handeleUnsubscribeButtonclick = async () => {
        try {
            const response = await fetch("http://localhost:3000/patients/65270df9cfa9abe7a31a4d88", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            });

            if (response.ok) {
                setPackage(null);
                setButtonPressed(true);
            } else {
                console.error("Failed to remove health package. Status:", response.status);
                const responseBody = await response.json();
                console.error("Response body:", responseBody);
            }
        } catch (error) {
            console.error("Error removing health package:", error);
        }
    };
    const handleHealthRecordUpload = async () => {
        let healthRecordUrl;
        if (healthRecord !== "") {
            const healthRecordRef = ref(storage, `${healthRecord.name}`);
            await uploadBytesResumable(healthRecordRef, healthRecord).then(async (snapshot) => {
                healthRecordUrl = await getDownloadURL(snapshot.ref);
            });
        }
        // const formData = new FormData();
        // formData.append('medicalRecord', healthRecordUrl);
        const data={
            medicalRecord:healthRecordUrl
        }

        try {
            console.log(healthRecordUrl);
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(data),
            };
            console.log(requestOptions.body)
            console.log(requestOptions);
            
            const response = await fetch(
                'http://localhost:3000/patients/65270df9cfa9abe7a31a4d88',
                requestOptions
            );
            console.log(response);
            if (response.ok) {
                alert("Health record uploaded successfully");
            }
            else {
                alert("Failed to upload health record");
            }
        }
        catch (error) {
            console.error("Error uploading health record:", error);
        }
    }

    useEffect(() => {
        fetchPackages();
    },
    []);

    const { healthRecordInput } = healthRecord;
    return (
        <body>
            <div>
                <button onClick={handeleUnsubscribeButtonclick}>Unsbscribe from current package</button>
            </div>
            <div>{
                !isButtonPressed && (
                    <>
                        <div>
                            {

                                healthPackage != null &&
                                <div>{JSON.stringify(healthPackage)}</div>
                            }
                        </div>
                    </>)}
                {isButtonPressed && (
                    <>
                        <div>You unsubscribed successfully</div>
                    </>
                )

                }
            </div>
            <div>
                <div>
                    <label>Health Record</label>
                    <input
                        type="file"
                        name="healthRecord"
                        value={healthRecordInput}
                        onChange={onHealthRecordChange}
                    />
                </div>
                <button onClick={handleHealthRecordUpload}>Upload Health Record</button>
            </div>




        </body>
    )


}
export default PatientAccountSettings;


