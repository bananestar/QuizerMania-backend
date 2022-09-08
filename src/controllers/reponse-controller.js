const { Request, Response } = require('express');
const db = require('../models');
const { ErrorResponse, NotFoundErrorResponse } = require('../response-schemas/error-schema');
const {
	SuccessObjectResponse,
	SuccessArrayResponse,
} = require('../response-schemas/success-schema');

//Todo: getAll, get, add, update, delete
const reponseController = {
	//! recuperation de tout les reponses
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	getAll: async (req, res) => {
		//Todo: recherche tout les reponses dans la db
		const data = await db.Reponse.findAndCountAll();
		return res.status(200).json(new SuccessArrayResponse(data.rows, data.count));
	},

	//! recuperation d'une reponse spécifique via son ID
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	get: async (req, res) => {
		const reponseID = parseInt(req.params.id);
		//Todo: recherche de la reponse dans la db
		const reponse = await db.Reponse.findOne({
			where: { reponseID },
		});

		//? cas si le reponse est introuvable ou n'existe pas
		if (!reponse) {
			return res.status(404).json(new NotFoundErrorResponse('Reponse not found'));
		}

		return res.status(200).json(new SuccessObjectResponse(reponse));
	},

	//! ajout d'une reponse
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	add: async (req, res) => {
		const data = req.validatedData;
		//Todo: Ajout de la reponse à la db
		const newReponse = await db.Reponse.create(data);
		return res.status(201).json(new SuccessObjectResponse(newReponse, 201));
	},

	//! mise à jour d'une reponse
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	update: async (req, res) => {
		const reponseID = parseInt(req.params.id);
		const data = req.validatedData;

		//Todo: request de mise à jour
		const updatedReponse = await db.Reponse.update(data, {
			where: { reponseID },
			returning: true,
		});

		if (!updatedReponse[1]) {
			return res.status(400).json(new ErrorResponse('BAD REQUEST'));
		}

		//Todo: request pour voir la modification
		const updateValue = await db.Reponse.findOne({ where: { reponseID } });
		return res.status(200).json(new SuccessObjectResponse(updateValue));
	},

	//! suppression d'une reponse
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	delete: async (req, res) => {
		const reponseID = parseInt(req.params.id);
		//Todo: request de suppression
		const nbRow = await db.Reponse.destroy({
			where: { reponseID },
		});

		//? cas Erreur: reponse introuvable
		if (nbRow !== 1) {
			return res.status(404).json(new NotFoundErrorResponse('Reponse not found'));
		}

		return res.sendStatus(204);
	},
};

module.exports = reponseController;
