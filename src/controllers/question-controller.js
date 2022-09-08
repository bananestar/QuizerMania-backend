const { Request, Response } = require('express');
const db = require('../models');
const { ErrorResponse, NotFoundErrorResponse } = require('../response-schemas/error-schema');
const {
	SuccessObjectResponse,
	SuccessArrayResponse,
} = require('../response-schemas/success-schema');

//Todo: getAll, get, add, update, delete
const questionController = {
	//! recuperation de tout les questions
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	getAll: async (req, res) => {
        //Todo: recherche tout les questions dans la db
		const data = await db.Question.findAndCountAll();
		return res.status(200).json(new SuccessArrayResponse(data.rows, data.count));
    },

    //! recuperation d'une question spécifique via son ID
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	get: async (req, res) => {
        const questionID = parseInt(req.params.id);
		//Todo: recherche de la question dans la db
		const question = await db.Question.findOne({
			where: { questionID },
		});

		//? cas si le QuizQuestions est introuvable ou n'existe pas
		if (!question) {
			return res.status(404).json(new NotFoundErrorResponse('Question not found'));
		}

		return res.status(200).json(new SuccessObjectResponse(question));
    },

    //! ajout d'une question
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	add: async (req, res) => {
        const data = req.validatedData;
		//Todo: Ajout de la question à la db
		const newQuestion = await db.Question.create(data);
		return res.status(201).json(new SuccessObjectResponse(newQuestion, 201));
    },

    //! mise à jour d'une question
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	update: async (req, res) => {
        const questionID = parseInt(req.params.id);
		const data = req.validatedData;

		//Todo: request de mise à jour
		const updatedQuestion = await db.Question.update(data, {
			where: { questionID },
			returning: true,
		});

		if (!updatedQuestion[1]) {
			return res.status(400).json(new ErrorResponse('BAD REQUEST'));
		}

		//Todo: request pour voir la modification
		const updateValue = await db.Question.findOne({ where: { questionID } });
		return res.status(200).json(new SuccessObjectResponse(updateValue));
    },

    //! suppression d'une question
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	delete: async (req, res) => {
        const questionID = parseInt(req.params.id);
		//Todo: request de suppression
		const nbRow = await db.Question.destroy({
			where: { questionID },
		});

		//? cas Erreur: question introuvable
		if (nbRow !== 1) {
			return res.status(404).json(new NotFoundErrorResponse('Question not found'));
		}
        
		return res.sendStatus(204);
    }
};

module.exports = questionController;
