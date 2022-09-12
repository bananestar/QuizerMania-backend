const questionController = require('../controllers/question-controller');
const authJWT = require('../middleware/auth-middleware');
const bodyValidation = require('../middleware/body-validation-middleware');
const { questionValidator, questionUpdatedValidator } = require('../validators/question-validator');
const questionRouter = require('express').Router();

questionRouter
	.route('/')
	.get(questionController.getAll) //! route getAll
	.post(authJWT(), bodyValidation(questionValidator), questionController.add); //! route add

questionRouter
	.route('/:id') //! url (../reponse/id)
	.get(questionController.get) //! route get
	.put(authJWT(), bodyValidation(questionUpdatedValidator), questionController.update) //! route update
	.delete(authJWT(), questionController.delete); //! route delete

module.exports = questionRouter;