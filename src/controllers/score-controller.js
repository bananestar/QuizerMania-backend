const { Request, Response } = require('express');
const db = require('../models');
const { ErrorResponse, NotFoundErrorResponse } = require('../response-schemas/error-schema');
const {
	SuccessObjectResponse,
	SuccessArrayResponse,
} = require('../response-schemas/success-schema');

//Todo: getAll, get, add, update, delete
const scoreController = {
	//! recuperation de tout les score
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	getAll: async (req, res) => {
		//Todo: recherche tout les scores dans la db
		const data = await db.Score.findAndCountAll();
		return res.status(200).json(new SuccessArrayResponse(data.rows, data.count));
	},
	//! recuperation d'un score spécifique via son ID
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	get: async (req, res) => {
		const scoreID = parseInt(req.params.id);
		//Todo: recherche du score dans la db
		const score = await db.Score.findOne({
			where: { scoreID },
		});

		//? cas si le score est introuvable ou n'existe pas
		if (!score) {
			return res.status(404).json(new NotFoundErrorResponse('Score not found'));
		}

		return res.status(200).json(new SuccessObjectResponse(score));
	},
	//! ajout d'un score
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	add: async (req, res) => {
		const data = req.validatedData;
		//Todo: Ajout du score à la db
		const newScore = await db.Score.create(data);
		return res.status(201).json(new SuccessObjectResponse(newScore, 201));
	},
	//! mise à jour d'un score
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	update: async (req, res) => {
		const scoreID = req.params.id;
		const data = req.validatedData;

		//Todo: request de mise à jour
		const updatedScore = await db.Score.update(data, {
			where: { scoreID },
			returning: true,
		});

		if (!updatedScore[1]) {
			return res.status(400).json(new ErrorResponse('BAD REQUEST'));
		}

		//Todo: request pour voir la modification
		const updateValue = await db.Score.findOne({ where: { scoreID } });
		return res.status(200).json(new SuccessObjectResponse(updateValue));
	},
	//! suppression d'un score
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	delete: async (req, res) => {
		const scoreID = req.params.id;
		//Todo: request de suppression
		const nbRow = await db.Score.destroy({
			where: { scoreID },
		});

		//? cas Erreur: score introuvable
		if (nbRow !== 1) {
			return res.status(404).json(new NotFoundErrorResponse('Score not found'));
		}
        
		return res.sendStatus(204);
	},
};

module.exports = scoreController;
