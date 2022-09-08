const userController = require('../controllers/user-controller');
const authJWT = require('../middleware/auth-middleware');
const bodyValidation = require('../middleware/body-validation-middleware');
const { userUpdatedValidator } = require('../validators/user-validator');
const userRouter = require('express').Router();

userRouter.route('/').get(userController.getAll);

userRouter
	.route('/:id')
	.get(userController.get)
	.put(bodyValidation(userUpdatedValidator), userController.update)
	.delete(authJWT(), userController.delete);

module.exports = userRouter;
