const yup = require('yup');

//! validator form add/update quizQuestion
const quizQuestionValidator = yup.object().shape({
	quizQuestionID: yup.string().trim().required().uuid(),
	quizID: yup.string().trim().required().uuid(),
	questionID: yup.number().positive().integer().required(),
});

module.exports = { quizQuestionValidator };
