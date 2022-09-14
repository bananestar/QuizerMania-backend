const yup = require('yup');

//! validator form add question
const questionValidator = yup.object().shape({
	themeID: yup.number().positive().integer().required(),
	libelle: yup.string().required(),
});

//! validator form update question

const questionUpdatedValidator = yup.object().shape({
	themeID: yup.number().positive().integer(),
	libelle: yup.string(),
});

module.exports = { questionValidator, questionUpdatedValidator };
