const yup = require('yup');

//! validator form add quiz
const quizValidator = yup.object().shape({
	name: yup.string().trim().required().max(100),
	createdAt: yup.date().default(function () {
		return new Date();
	}),
	updatedAt: yup.date().default(function () {
		return new Date();
	}),
});

//! validator form update quiz
const quizUpdatedValidator = yup.object().shape({
	quizID: yup.string().trim().required().uuid(),
	name: yup.string().trim().max(100),
	updatedAt: yup.date().default(function () {
		return new Date();
	}),
});

module.exports = { quizValidator, quizUpdatedValidator };
