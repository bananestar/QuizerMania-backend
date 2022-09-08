const { Request, Response } = require('express');
const db = require('../models');
const { ErrorResponse, NotFoundErrorResponse } = require('../response-schemas/error-schema');
const {
	SuccessObjectResponse,
	SuccessArrayResponse,
} = require('../response-schemas/success-schema');

//Todo: getAll, get, add, update, delete
const themeController = {
	//! recuperation de tout les themes
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	getAll: async (req, res) => {
		//Todo: recherche tout les theme dans la db
		const data = await db.Theme.findAndCountAll();
		return res.status(200).json(new SuccessArrayResponse(data.rows, data.count));
	},

	//! recuperation d'une theme spécifique via son ID
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	get: async (req, res) => {
		const themeID = parseInt(req.params.id);
		//Todo: recherche de la theme dans la db
		const theme = await db.Theme.findOne({
			where: { themeID },
		});

		//? cas si le theme est introuvable ou n'existe pas
		if (!theme) {
			return res.status(404).json(new NotFoundErrorResponse('Theme not found'));
		}

		return res.status(200).json(new SuccessObjectResponse(theme));
	},

	//! ajout d'une theme
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	add: async (req, res) => {
		const data = req.validatedData;
		//Todo: Ajout de la theme à la db
		const newTheme = await db.Theme.create(data);
		return res.status(201).json(new SuccessObjectResponse(newTheme, 201));
	},

	//! mise à jour d'une theme
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	update: async (req, res) => {
		const themeID = parseInt(req.params.id);
		const data = req.validatedData;

		//Todo: request de mise à jour
		const updatedTheme = await db.Theme.update(data, {
			where: { themeID },
			returning: true,
		});

		if (!updatedTheme[1]) {
			return res.status(400).json(new ErrorResponse('BAD REQUEST'));
		}

		//Todo: request pour voir la modification
		const updateValue = await db.Theme.findOne({ where: { themeID } });
		return res.status(200).json(new SuccessObjectResponse(updateValue));
	},

	//! suppression d'une reponse
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	delete: async (req, res) => {
		const themeID = parseInt(req.params.id);
		//Todo: request de suppression
		const nbRow = await db.Theme.destroy({
			where: { themeID },
		});

		//? cas Erreur: theme introuvable
		if (nbRow !== 1) {
			return res.status(404).json(new NotFoundErrorResponse('Theme not found'));
		}

		return res.sendStatus(204);
	},
};

module.exports = themeController;
