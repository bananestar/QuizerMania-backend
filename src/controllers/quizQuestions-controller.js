const { Request, Response } = require('express');
const db = require('../models');
const { ErrorResponse, NotFoundErrorResponse } = require('../response-schemas/error-schema');
const {
	SuccessObjectResponse,
	SuccessArrayResponse,
} = require('../response-schemas/success-schema');

//Todo: getAll, get, add, update, delete
const quizQuestionsController = {
	//! recuperation de tout les quizQuestion
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	getAll: async (req, res) => {
        //Todo: recherche tout les quizQuestion dans la db
		const data = await db.Quiz.findAndCountAll();
		return res.status(200).json(new SuccessArrayResponse(data.rows, data.count));
    },

	//! recuperation d'un quizQuestion spécifique via son ID
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	get: async (req, res) => {
        const quizQuestionID = parseInt(req.params.id);
		//Todo: recherche du quizQuestion dans la db
		const quizQuestion = await db.QuizQuestions.findOne({
			where: { quizQuestionID },
		});

		//? cas si le QuizQuestions est introuvable ou n'existe pas
		if (!quizQuestion) {
			return res.status(404).json(new NotFoundErrorResponse('QuizQuestion not found'));
		}

		return res.status(200).json(new SuccessObjectResponse(quizQuestion));
    },

	//! ajout d'un quizQuestion
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	add: async (req, res) => {
        const data = req.validatedData;
		//Todo: Ajout du quizQuestion à la db
		const newQuizQuestion = await db.QuizQuestions.create(data);
		return res.status(201).json(new SuccessObjectResponse(newQuizQuestion, 201));
    },

	//! mise à jour d'un quizQuestion
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	update: async (req, res) => {
        const quizQuestionID = parseInt(req.params.id);
		const data = req.validatedData;

		//Todo: request de mise à jour
		const updatedQuizQuestion = await db.QuizQuestions.update(data, {
			where: { quizQuestionID },
			returning: true,
		});

		if (!updatedQuizQuestion[1]) {
			return res.status(400).json(new ErrorResponse('BAD REQUEST'));
		}

		//Todo: request pour voir la modification
		const updateValue = await db.QuizQuestions.findOne({ where: { quizQuestionID } });
		return res.status(200).json(new SuccessObjectResponse(updateValue));
    },

	//! suppression d'un quizQuestion
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	delete: async (req, res) => {
        const quizQuestionID = parseInt(req.params.id);
		//Todo: request de suppression
		const nbRow = await db.QuizQuestions.destroy({
			where: { quizQuestionID },
		});

		//? cas Erreur: QuizQuestions introuvable
		if (nbRow !== 1) {
			return res.status(404).json(new NotFoundErrorResponse('QuizQuestion not found'));
		}
        
		return res.sendStatus(204);
    },
};

module.exports = quizQuestionsController;
