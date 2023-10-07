const mongoose = require('mongoose');
const validator = require('validator');
const Doctor = require('./doctorModel');
const Patient = require('./patientModel');

const prescriptionSchema = new mongoose.Schema({
    doctor: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Doctor',
            required: [true, 'A prescription must be written by a doctor.'],
        },
    ],
    patient: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Patient',
            required: [true, 'A prescription must belong to a patient.'],
        },
    ],
    body:{
        type: String,
        required: [true, 'Please provide a prescription.'],
        maxlength: [255, 'A prescription must have less or equal to 255 characters'],
    }
})

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;