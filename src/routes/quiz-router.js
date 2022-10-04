const quizController = require('../controllers/quiz-controller');
const authJWT = require('../middleware/auth-middleware');
const bodyValidation = require('../middleware/body-validation-middleware');
const { quizValidator, quizUpdatedValidator } = require('../validators/quiz-validator');

const quizRouter = require('express').Router();

quizRouter
	.route('/')
	.get(quizController.getAll) //! route getAll
	.post(authJWT(), bodyValidation(quizValidator), quizController.add); //! route add

quizRouter
	.route('/:id') //! url (../quiz/example.uuid)
	.get(quizController.get) //! route get
	.delete(authJWT(), quizController.delete); //! route delete

quizRouter.route('/allquestionquiz/:id').get(quizController.getAllQuestionQuiz) //! route getAllQuestionQuiz

quizRouter.route('/addQuiz').post(authJWT(),quizController.addQuiz) //! route addQuiz
quizRouter.route('/updatedQuiz/:id').put(quizController.updateQuiz) //! route addQuiz

module.exports = quizRouter