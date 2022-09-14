const yup = require('yup');

//! validator form add score
const scoreValidator = yup.object().shape({
	userID: yup.string().trim().required().uuid(),
	quizID: yup.string().trim().required().uuid(),
	score: yup.number().required().positive(),
	createdAt: yup.date().default(function () {
		return new Date();
	}),
	updatedAt: yup.date().default(function () {
		return new Date();
	}),
});

//! validator form update score
const scoreUpdatedValidator = yup.object().shape({
	scoreID: yup.string().trim().required().uuid(),
	userID: yup.string().trim().required().uuid(),
	quizID: yup.string().trim().required().uuid(),
	score: yup.number().positive(),
	updatedAt: yup.date().default(function () {
		return new Date();
	}),
});

module.exports = { scoreValidator, scoreUpdatedValidator}