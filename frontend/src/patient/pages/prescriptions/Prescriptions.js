import { useEffect, useState, useRef } from "react";
import classes from "./Prescriptions.module.css";
import NavBar from "../../../shared/components/NavBar/NavBar";
import { Checkbox } from "@mui/material";
import jsPDF from 'jspdf';
import PrescriptionPDF from "./PrescriptionPDF";
import PrescriptionTile from "./PrescriptionTile";

const Prescriptions = () => {
    const dummy_presc = [
        {
            id: 1,
            name: "Cataflam",
            dosage: "3",
            frequency: "After each meal",
            doctor: "Habiiba",
            date: "28/12/2002",
            status: "Filled"
        },
        {
            id: 2,
            name: "Cataflam",
            dosage: "3",
            frequency: "Before breakfast",
            doctor: "Habiiba",
            date: "28/12/2002",
            status: "Unfilled"
        },
        {
            id: 3,
            name: "Cataflam",
            dosage: "3",
            frequency: "Daily",
            doctor: "Habiiba",
            date: "28/12/2002",
            status: "Filled"
        },
    ];
    const [filterIndex, setFilterIndex] = useState(0);
    const [selectedPrescriptions, setSelectedPrescriptions] = useState([]);
    const pdfRef = useRef(null);

    useEffect(() => {
        console.log(selectedPrescriptions);
    }, [selectedPrescriptions]);

    const getTiles = () => {
        return <div>
            {dummy_presc.map((presc => 
                <PrescriptionTile setSelectedPrescriptions={setSelectedPrescriptions} presc={presc}/>
            ))}
        </div>
    }
    
    const downloadPrescriptions = () => {
        if (selectedPrescriptions.length == 0) return;

        const doc = new jsPDF({ orientation: "landscape", format: [1450, 780], unit: "px" });
        doc.setFont('Helvetica', 'normal');

        doc.html(pdfRef.current, {
            async callback(doc) {
                doc.save('Clinic Prescription');
            },
        });
    }

    return <div style={{ height: "100vh", overflow: "hidden" }}>
        <NavBar />
        <div className={classes.wrapper}>
            <div className={classes.header}>PRESCRIPTIONS</div>
            <div className={classes.tableWrapper}>
                <div className={classes.tableOptions}>
                    <div className={filterIndex == 0 ? classes.optionEnabled : classes.option} onClick={() => setFilterIndex(0)}>All Prescriptions</div>
                    <div className={filterIndex == 1 ? classes.optionEnabled : classes.option} onClick={() => setFilterIndex(1)}>Doctor</div>
                    <div className={filterIndex == 2 ? classes.optionEnabled : classes.option} onClick={() => setFilterIndex(2)}>dd/mm/yy</div>
                    <div style={{ flex: 1 }}></div>
                    <div onClick={downloadPrescriptions} className={`${classes.downloadButton} ${selectedPrescriptions.length != 0 ? classes.downloadEnabled : ""}`}>Download PDF</div>
                </div>
                <div className={classes.table}>
                    <div className={classes.tableHeader}>
                        <div style={{ flex: 2 }}>Medicine</div>
                        <div style={{ flex: 1 }}>Dosage</div>
                        <div style={{ flex: 2 }}>Frequency</div>
                        <div style={{ flex: 2 }}>Doctor</div>
                        <div style={{ flex: 2 }}>Issue Date</div>
                        <div style={{ flex: 1 }}>Status</div>
                    </div>
                    {getTiles()}
                </div>
            </div>
            <div style={{ marginTop: "400px" }}>
                <div ref={pdfRef}>
                    <PrescriptionPDF prescriptions={selectedPrescriptions} />
                </div>
            </div>


        </div>
    </div>


}

export default Prescriptions;