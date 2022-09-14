const { Op } = require('sequelize');
const db = require('../models');
const { decodeJWT } = require('../utils/jwt-utils');

//! authentification
const authJWT = (options = { adminRight: true }) => {
	return async (req, res, next) => {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];

		let tokenData;

		//? Si le token n'existe pas
		if (!token) {
			return res.sendStatus(401);
		}

		//? test du token
		try {
			tokenData = await decodeJWT(token);
		} catch (error) {
			return res.sendStatus(403);
		}

		//? test si l'utilisateur est admin
		if (options.adminRight) {
			const admin = await db.User.findOne({
				where: {
					[Op.and]: [{ userID: tokenData.id }, { isAdmin: true }],
				},
			});

			if (!admin) {
				return res.sendStatus(403);
			}
		}

        //? si tout va bien renvoie l'auth
		req.user = tokenData;

		next();
	};
};

module.exports = authJWT