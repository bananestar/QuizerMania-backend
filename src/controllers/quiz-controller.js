const { Request, Response } = require('express');
const db = require('../models');
const { ErrorResponse, NotFoundErrorResponse } = require('../response-schemas/error-schema');
const {
	SuccessObjectResponse,
	SuccessArrayResponse,
} = require('../response-schemas/success-schema');

//Todo: getAll, get, add, update, delete
const quizController = {
	//! recuperation de tout les quiz
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	getAll: async (req, res) => {
		//Todo: recherche tout les quiz dans la db
		const data = await db.Quiz.findAndCountAll();
		return res.status(200).json(new SuccessArrayResponse(data.rows, data.count));
	},

	//! recuperation d'un quiz spécifique via son ID
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	get: async (req, res) => {
		const quizID = parseInt(req.params.id);
		//Todo: recherche du quiz dans la db
		const quiz = await db.Quiz.findOne({
			where: { quizID },
		});

		//? cas si le quiz est introuvable ou n'existe pas
		if (!quiz) {
			return res.status(404).json(new NotFoundErrorResponse('Quiz not found'));
		}

		return res.status(200).json(new SuccessObjectResponse(quiz));
	},

	//! ajout d'un quiz
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	add: async (req, res) => {
		const data = req.validatedData;
		//Todo: Ajout du quiz à la db
		const newQuiz = await db.Quiz.create(data);
		return res.status(201).json(new SuccessObjectResponse(newQuiz, 201));
	},

	//! mise à jour d'un quiz
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	update: async (req, res) => {
		const quizID = parseInt(req.params.id);
		const data = req.validatedData;

		//Todo: request de mise à jour
		const updatedQuiz = await db.Quiz.update(data, {
			where: { quizID },
			returning: true,
		});

		if (!updatedQuiz[1]) {
			return res.status(400).json(new ErrorResponse('BAD REQUEST'));
		}

		//Todo: request pour voir la modification
		const updateValue = await db.Quiz.findOne({ where: { quizID } });
		return res.status(200).json(new SuccessObjectResponse(updateValue));
	},
	
	//! suppression d'un quiz
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	delete: async (req, res) => {
		const quizID = parseInt(req.params.id);
		//Todo: request de suppression
		const nbRow = await db.Quiz.destroy({
			where: { quizID },
		});

		//? cas Erreur: Quiz introuvable
		if (nbRow !== 1) {
			return res.status(404).json(new NotFoundErrorResponse('Quiz not found'));
		}
        
		return res.sendStatus(204);
	},
};

module.exports = quizController;
