const yup = require('yup');

//! validator form add quiz
const quizValidator = yup.object().shape({
	name: yup.string().trim().required().max(100),
});

//! validator form update quiz
const quizUpdatedValidator = yup.object().shape({
	name: yup.string().trim().max(100),
});

module.exports = { quizValidator, quizUpdatedValidator };
