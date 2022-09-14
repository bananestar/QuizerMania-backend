const themeController = require('../controllers/theme-controller');
const authJWT = require('../middleware/auth-middleware');
const bodyValidation = require('../middleware/body-validation-middleware');
const { themeValidator } = require('../validators/theme-validator');
const themeRouter = require('express').Router();

themeRouter
	.route('/')
	.get(themeController.getAll) //! route getAll
	.post(authJWT(), bodyValidation(themeValidator), themeController.add); //! route add

themeRouter
	.route('/:id') //! url (../themes/id)
	.get(themeController.get) //! route get
	.put(authJWT(), bodyValidation(themeValidator), themeController.update) //! route update
	.delete(authJWT(), themeController.delete); //! route delete

module.exports = themeRouter;
