const { Request, Response } = require('express');
const db = require('../models');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../utils/jwt-utils');
const { ErrorResponse, NotFoundErrorResponse } = require('../response-schemas/error-schema');
const {
	SuccessObjectResponse,
	SuccessArrayResponse,
} = require('../response-schemas/success-schema');

//Todo: getAll, get, update, delete
const userController = {
	//! recuperation de tout les utilisateurs
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	getAll: async (req, res) => {
		//Todo: recherche tout les utilisateurs dans la db
		const data = await db.User.findAndCountAll();
		return res.status(200).json(new SuccessArrayResponse(data.rows, data.count));
	},

	//! recuperation d'un utilisateur spécifique via son ID
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	get: async (req, res) => {
		const userID = req.params.id;
		//Todo: recherche l'utilisateur dans la db
		const user = await db.User.findOne({
			where: { userID },
		});

		//? cas si l'utilisateur est introuvable ou n'existe pas
		if (!user) {
			return res.status(404).json(new NotFoundErrorResponse('User not found'));
		}

		return res.status(200).json(new SuccessObjectResponse(user));
	},

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	add: async (req, res) => {
		const dataTemp = req.validatedData;
		console.log(dataTemp);
		const hashedPassword = await bcrypt.hash(dataTemp.password, 10);

		const data = {
			updatedAt: dataTemp.updatedAt,
			createdAt: dataTemp.createdAt,
			isAdmin: dataTemp.isAdmin,
			password: hashedPassword,
			email: dataTemp.email,
			pseudo: dataTemp.pseudo,
		};

		const user = await db.User.create(data);

		return res.status(201).json(new SuccessObjectResponse(user, 201));
	},

	//! mise à jour d'un utilisateur
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	update: async (req, res) => {
		const userID = req.params.id;
		const data = req.validatedData;

		//Todo: request de mise à jour
		const updatedUser = await db.User.update(data, {
			where: { userID },
			returning: true,
		});

		//? cas Erreur: utilisateur introuvable
		if (!updatedUser[1]) {
			return res.status(400).json(new ErrorResponse('BAD REQUEST'));
		}

		//? creation token
		const token = await generateJWT({
			userID: data.userID,
			pseudo: data.pseudo,
			isAdmin: data.isAdmin,
		});

		return res.status(200).json(new SuccessObjectResponse(token));
	},
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	updateIMG: async (req, res) => {
		const userID = req.params.id;
		const data = {
			img: req.file.publicUrl,
		};

		const updatedUser = await db.User.update(data, {
			where: { userID },
			returning: true,
		});

		//? cas Erreur: utilisateur introuvable
		if (!updatedUser[1]) {
			return res.status(400).json(new ErrorResponse('BAD REQUEST'));
		}

		//? creation token
		const token = await generateJWT({
			userID: data.userID,
			pseudo: data.pseudo,
			isAdmin: data.isAdmin,
		});

		return res.status(200).json(new SuccessObjectResponse(token));
	},
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	updatePWD: async (req, res) => {
		const userID = req.params.id;
		const dataTemp = req.body;

		const hashedPassword = await bcrypt.hash(dataTemp.password, 10);

		const data = {
			password: hashedPassword,
		};

		const updatedUser = await db.User.update(data, {
			where: { userID },
			returning: true,
		});

		//? cas Erreur: utilisateur introuvable
		if (!updatedUser[1]) {
			return res.status(400).json(new ErrorResponse('BAD REQUEST'));
		}

		//? creation token
		const token = await generateJWT({
			userID: data.userID,
			pseudo: data.pseudo,
			isAdmin: data.isAdmin,
		});

		return res.status(200).json(new SuccessObjectResponse(token));
	},

	//! suppression d'un utilisateur
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	delete: async (req, res) => {
		const id = req.params.id;

		console.log(id);
		//Todo: request de suppression
		const nbRow = await db.User.destroy({
			where: { userID: id },
		});

		//? cas Erreur: utilisateur introuvable
		if (nbRow !== 1) {
			return res.status(404).json(new NotFoundErrorResponse('User not found'));
		}

		return res.sendStatus(204);
	},
};

module.exports = userController;
