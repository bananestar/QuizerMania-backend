const reponseController = require('../controllers/reponse-controller');
const authJWT = require('../middleware/auth-middleware');
const bodyValidation = require('../middleware/body-validation-middleware');
const { reponseValidator, reponseUpdatedValidator } = require('../validators/reponse-validator');
const reponseRouter = require('express').Router();

reponseRouter
	.route('/')
	.get(reponseController.getAll) //! route getAll
	.post(authJWT(), bodyValidation(reponseValidator), reponseController.add); //! route add

reponseRouter
	.route('/:id') //! url (../reponse/id)
	.get(reponseController.get) //! route get
	.put(authJWT(), bodyValidation(reponseUpdatedValidator), reponseController.update) //! route update
	.delete(authJWT(), reponseController.delete); //! route delete

module.exports = reponseRouter;
