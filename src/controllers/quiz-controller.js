const { Request, Response } = require('express');
const { Question, Reponse, Theme } = require('../models');
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
		const quizID = req.params.id;
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

	//! ajout d'un quiz avec question/reponse
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	addQuiz: async (req, res) => {
		const data = req.body;
		//Todo: Ajout du quiz à la db
		// const newQuiz = await db.Quiz.create(data, {
		// 	include: [{ association: Question, include: [{ Reponse }, { Theme }] }],
		// });
		// return res.status(201).json(new SuccessObjectResponse(newQuiz, 201));

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

		//? cas si le quiz est introuvable ou n'existe pas
		if (!questionsAllByQuizz) {
			return res.status(404).json(new NotFoundErrorResponse('Quiz not found'));
		}

		return res.status(200).json(new SuccessObjectResponse(questionsAllByQuizz));
	},
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	updateQuiz: async (req, res) => {
		const quizID = req.params.id;
		const data = req.body;

		const quiz = {
			quizID: quizID,
			name: data.name,
			createdAt: data.createdAt,
			updatedAt: new Date(),
		};

		const updatedQuiz = await db.Quiz.update(quiz, {
			where: { quizID },
			returning: true,
		});

		if (!updatedQuiz[1]) {
			console.log('test 1');
		}

		data.questions.forEach(async (question) => {
			const searchQuestion = await db.Question.findOne({
				where: { questionID: question.questionID },
			});

			if (searchQuestion) {
				const quest = {
					themeID: question.themeID,
					libelle: question.libelle,
				};

				const updatedQuestion = await db.Question.update(quest, {
					where: { questionID: question.questionID },
					returning: true,
				});

				question.reponses.forEach(async (reponse) => {
					const rep = {
						questionID: reponse.questionID,
						isValid: reponse.isValid,
						libelle: reponse.libelle,
					};

					const updatedReponse = await db.Reponse.update(rep, {
						where: { reponseID: reponse.reponseID },
						returning: true,
					});
				});
			}else{
				const quest = {
					themeID: question.themeID,
					libelle: question.libelle,
				};

				const { questionID } = await db.Question.create(quest);

				await db.QuizQuestions.create({ quizID: quizID, questionID: questionID });

				question.reponses.forEach(async (rep) => {
					const dataRep = {
						questionID: questionID,
						libelle: rep.libelle,
						isValid: rep.isValid,
					};
					await db.Reponse.create(dataRep);
				});
			}
		});

		return res.sendStatus(200);
	},

	//! mise à jour d'un quiz
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	update: async (req, res) => {
		const quizID = req.params.id;
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
		const quizID = req.params.id;

		const quizQuestion = await db.QuizQuestions.findAll({
			where: {
				quizID: quizID,
			},
		});

		quizQuestion.forEach(async (el) => {
			const questionID = el.dataValues.questionID;
			await db.Question.destroy({
				where: { questionID },
			});
		});

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

	//! getAllQuestion by quiz
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	getAllQuestionQuiz: async (req, res) => {
		const quizID = req.params.id;

		//Todo: recherche du quiz dans la db avec les questions/réponses
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

		//? cas si le quiz est introuvable ou n'existe pas
		if (!questionsAllByQuizz) {
			return res.status(404).json(new NotFoundErrorResponse('Quiz not found'));
		}

		return res.status(200).json(new SuccessObjectResponse(questionsAllByQuizz));
	},
};

module.exports = quizController;
