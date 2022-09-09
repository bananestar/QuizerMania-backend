const yup = require('yup');

//! validator form add/update quizQuestion
const quizQuestionValidator = yup.object().shape({
	quizQuestionID: yup.string().trim().required().uuid(),
	quizID: yup.string().trim().required().uuid(),
	questionID: yup.string().trim().required().uuid(),
});

module.exports = { quizQuestionValidator };
