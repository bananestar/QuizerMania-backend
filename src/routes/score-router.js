const scoreController = require('../controllers/score-controller');
const bodyValidation = require('../middleware/body-validation-middleware');
const { scoreValidator, scoreUpdatedValidator } = require('../validators/score-validator');
const authJWT = require('../middleware/auth-middleware');

const scoreRouter = require('express').Router();

scoreRouter
	.route('/')
	.get(scoreController.getAll) //! route getAll
	.post(authJWT(), bodyValidation(scoreValidator), scoreController.add); //! route add

scoreRouter
	.route('/addByUser')
	.put(authJWT(), bodyValidation(scoreUpdatedValidator), scoreController.addByUser);

scoreRouter.route('/byUser/:id').get(scoreController.getByUser); //! route getAll by User
scoreRouter.route('/byQuiz/:id').get(scoreController.getByQuiz); //! route getAll by Quiz

scoreRouter
	.route('/:id') //! url (../score/example.uuid)
	.get(scoreController.get) //! route get
	.put(authJWT(), bodyValidation(scoreUpdatedValidator), scoreController.update) //! route update
	.delete(authJWT(), scoreController.delete); //! route delete

module.exports = scoreRouter;
