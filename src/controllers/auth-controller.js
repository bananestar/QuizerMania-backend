const { Request, Response } = require('express');
const db = require('../models');
const bcrypt = require('bcrypt');
const { SuccessObjectResponse } = require('../response-schemas/success-schema');
const { Op } = require('sequelize');
const { ErrorResponse } = require('../response-schemas/error-schema');
const { generateJWT } = require('../utils/jwt-utils');

//Todo: register, login
const authController = {
	//! Inscription User
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	register: async (req, res) => {
		const { pseudo, email } = req.body;
		//Todo: Hashed mots de passe
		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		//? rajoute user dans la db
		const user = await db.User.create({
			pseudo,
			email,
			password: hashedPassword,
		});

		//? génère token
		const token = await generateJWT({
			id: user.userID,
			pseudo: user.pseudo,
			isAdmin: user.isAdmin,
		});

		//? retourne le token
		return res.json(new SuccessObjectResponse(token));
	},

	//! Connection User
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	login: async (req, res) => {
		const { identifier, password } = req.body;
		//Todo: Cherche User qui correspond au identifiant
		const user = await db.User.findOne({
			where: {
				[Op.or]: [
					{
						pseudo: identifier,
					},
					{
						email: identifier,
					},
				],
			},
		});

		//? Mauvais identifiant
		if (!user) {
			return res.status(422).json(new ErrorResponse('Bad Credentials', 422));
		}

		//? Compare MDP
		const isPasswordSame = await bcrypt.compare(password, user.password);

		if (!isPasswordSame) {
			return res.status(422).json(new ErrorResponse('Bad Credentials', 422));
		}

		//? Génère token
		const token = await generateJWT({
			userID: user.userID,
			pseudo: user.pseudo,
			isAdmin: user.isAdmin,
		});

		return res.json(new SuccessObjectResponse(token));
	},
};

module.exports = authController;
