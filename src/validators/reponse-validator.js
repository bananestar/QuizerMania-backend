const yup = require('yup');

//! validator form add reponse
const reponseValidator = yup.object().shape({
	reponseID: yup.string().trim().required().uuid(),
	questionID: yup.string().trim().required().uuid(),
	isValid: yup.boolean().required(),
	libelle: yup.string().required(),
});

//! validator form update reponse

const reponseUpdatedValidator = yup.object().shape({
	reponseID: yup.string().trim().required().uuid(),
	questionID: yup.string().trim().required().uuid(),
	isValid: yup.boolean(),
	libelle: yup.string(),
});

module.exports = { reponseValidator, reponseUpdatedValidator };
