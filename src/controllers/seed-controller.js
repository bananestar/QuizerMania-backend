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
		console.log(req);

		const { quizID } = await db.Quiz.create(req[0]);

		try {
			req[0].question.forEach(async (quest) => {
				console.log(quest);
				const { questionID } = await db.Question.create(quest);
				const QuizQuestion = await db.QuizQuestions.create({
					quizID: quizID,
					questionID: questionID,
				});
				quest.reponse.forEach(async (rep) => {
					const reponse = await db.Reponse.create(rep);
				});
			});
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
};

module.exports = seedController;
