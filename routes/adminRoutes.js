const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.route('/').get(adminController.getAllAdmins).post(adminController.createAdmin);

module.exports = router;
