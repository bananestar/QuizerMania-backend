const quizQuestionsController = require('../controllers/quizQuestions-controller');
const authJWT = require('../middleware/auth-middleware');
const bodyValidation = require('../middleware/body-validation-middleware');
const { quizQuestionValidator } = require('../validators/quizQuestion-validator');

const quizQuestionRouter = require('express').Router();

quizQuestionRouter
	.route('/')
	.get(quizQuestionsController.getAll) //! route getAll
	.post(authJWT(), bodyValidation(quizQuestionValidator), quizQuestionsController.add); //! route add

quizQuestionRouter
	.route('/:id') //! url (../quizQuestion/example.uuid)
	.get(quizQuestionsController.get) //! route get
	.put(authJWT(), bodyValidation(quizQuestionValidator), quizQuestionsController.update) //! route update
	.delete(authJWT(), quizQuestionsController.delete); //! route delete

module.exports = quizQuestionRouter