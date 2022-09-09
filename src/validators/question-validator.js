const yup = require('yup');

//! validator form add question
const questionValidator = yup.object().shape({
	questionID: yup.string().trim().required().uuid(),
	themeID: yup.string().trim().required().uuid(),
	libelle: yup.string().required(),
});

//! validator form update question

const questionUpdatedValidator = yup.object().shape({
	questionID: yup.string().trim().required().uuid(),
	themeID: yup.string().trim().required().uuid(),
	libelle: yup.string(),
});

module.exports = { questionValidator, questionUpdatedValidator };
