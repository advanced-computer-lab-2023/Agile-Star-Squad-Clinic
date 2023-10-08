const mongoose = require('mongoose');
const validator = require('validator');
const { v4: uuidv4 } = require('uuid');

const packageSchema = new mongoose.Schema({
    packageId: {
        type: String,
        unique: true, // Ensure unique package IDs
        default: uuidv4, // Generate a UUID as the default ID
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true, // Ensure unique package names
    },
    pricePerYear: {
        type: Number,
        required: true,
    },
    doctorSessionDiscount: {
        type: Number,
        default: 0, // 0% discount by default
    },
    medicineDiscount: {
        type: Number,
        default: 0, // 0% discount by default
    },
    familyMemberDiscount: {
        type: Number,
        default: 0, // 0% discount by default
    },

    description: {
        type: String,
        required: [true, 'Please provide a prescription.'],
        maxlength: [255, 'A prescription must have less or equal to 255 characters'],
    },

    dateOfCreation: {
        type: Date,
        required:[true , 'Please provide a creation date'],
        default: Date.now
    },


})

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;