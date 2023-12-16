const mongoose = require('mongoose');
const validator = require('validator');


const packageSchema = new mongoose.Schema({
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
       
        // maxlength: [255, 'A prescription must have less or equal to 255 characters'],
    },



})

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;