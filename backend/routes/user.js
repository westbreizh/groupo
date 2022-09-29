const express = require('express');
const router = express.Router();
const passwordSchema = require("../middleware/password-validator");
const userCtrl = require('../controllers/user');

//router.post('/signup', passwordSchema, userCtrl.signup);

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', userCtrl.modifyOneUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;