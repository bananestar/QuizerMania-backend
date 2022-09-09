const { userValidator } = require('../validators/user-validator');
const bodyValidation = require('../middleware/body-validation-middleware');
const authController = require('../controllers/auth-controller');

const authRouter = require('express').Router();

//! route register
authRouter.route('/register').post(bodyValidation(userValidator),authController.register)
//! route login
authRouter.route('/login').post(authController.login)

module.exports = authRouter