const { faker } = require('@faker-js/faker');
const { Request, Response } = require('express');
const db = require('../models');
const bcrypt = require('bcrypt');
const { User, sequelize, Question, QuizQuestions } = require('../models');
const { ADMIN_USER, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

const seedController = {
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	AddUser: async (req, res) => {
		const hashedPassword = await bcrypt.hash('test1234=', 10);
		const gender = Math.random() < 0.5 ? 'male' : 'female';
		const firstName = faker.name.firstName(gender);
		const lastName = faker.name.lastName(gender);

		const data = {
			pseudo: faker.internet.userName(firstName, lastName),
			email: faker.internet.email(firstName, lastName),
			password: hashedPassword,
			img: faker.image.avatar(),
		};

		return await db.User.create(data);
	},

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	AddAdmin: async (req, res) => {
		const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
		const data = {
			pseudo: ADMIN_USER,
			email: ADMIN_EMAIL,
			password: hashedPassword,
			img: 'https://firebasestorage.googleapis.com/v0/b/quizermania-f7be1.appspot.com/o/bv2.jpg?alt=media&token=5c0fc6fc-1cc3-4b30-9c56-05fdc3d15a45',
			isAdmin: true,
		};

		return await db.User.create(data);
	},

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	AddTheme: async (req, res) => {
		const data = {
			name: req,
		};
		return await db.Theme.create(data);
	},

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	AddQuiz: async (req, res) => {
		try {
			const { quizID, name } = await db.Quiz.create(req[0]);
			req[0].question.forEach(async (question) => {
				const { questionID } = await db.Question.create(question);
				await db.QuizQuestions.create({
					quizID: quizID,
					questionID: questionID,
				});
				question.reponse.forEach(async (rep) => {
					await db.Reponse.create(rep);
				});
			});
			return name
		} catch (error) {
			console.log(error);
		}
	},

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	AddScore: async (req, res) => {
		let user;
		let quiz;

		let userID;
		let quizID;

		let score;
		let loop;

		do {
			user = await db.User.findAll({ order: sequelize.random(), limit: 1 });
			quiz = await db.Quiz.findAll({ order: sequelize.random(), limit: 1 });

			userID = user[0].dataValues.userID;
			quizID = quiz[0].dataValues.quizID;

			score = await db.Score.findOne({ where: { userID: userID, quizID: quizID } });

			if (score === null) {
				loop = false;
			} else loop = true;
		} while (loop);

		const Score = Math.floor(Math.random() * 100) + 1;

		const data = {
			score: Score,
			userID: userID,
			quizID: quizID,
		};

		return await db.Score.create(data);
	},

	//! recuperation de tout les quiz
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	 getAll: async (req, res) => {
		//Todo: recherche tout les quiz dans la db
		const data = await db.Quiz.findAndCountAll();
		return data
	},
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	getAllQ: async (req, res) => {
        //Todo: recherche tout les questions dans la db
		const data = await db.Question.findAndCountAll();
		return data
    },
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	getAllR: async (req, res) => {
		//Todo: recherche tout les reponses dans la db
		const data = await db.Reponse.findAndCountAll();
		return data
	},
	//! ajout d'un quiz avec question/reponse
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	 addQuizV2: async (req, res) => {
		const data = req;

		const { quizID } = await db.Quiz.create(data);
		data.question.forEach(async (question) => {
			const { questionID } = await db.Question.create(question);
			await db.QuizQuestions.create({ quizID: quizID, questionID: questionID });
			question.reponse.forEach(async (rep) => {
				const dataRep = {
					questionID: questionID,
					libelle: rep.libelle,
					isValid: rep.isValid,
				};
				await db.Reponse.create(dataRep);
			});
		});

		const questionsAllByQuizz = await db.Quiz.findAll({
			where: { quizID },
			include: [
				{
					model: db.Question,
					through: { attributes: [] },
					include: {
						model: db.Reponse,
					},
				},
			],
		});

		// //? cas si le quiz est introuvable ou n'existe pas
		// if (!questionsAllByQuizz) {
		// 	return res.status(404).json(new NotFoundErrorResponse('Quiz not found'));
		// }

		// return res.status(200).json(new SuccessObjectResponse(questionsAllByQuizz));
		return 'ok'
	},
};

module.exports = seedController;
