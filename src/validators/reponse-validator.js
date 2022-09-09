const yup = require('yup');

// yup.string().trim().required().uuid()
//! validator form add reponse
const reponseValidator = yup.object().shape({
	reponseID: yup.string().trim().required().uuid(),
	questionID: yup.string().trim().required().uuid(),
	libelle: yup.string().required(),
});

//! validator form update reponse

const reponseUpdatedValidator = yup.object().shape({
	reponseID: yup.string().trim().required().uuid(),
	questionID: yup.string().trim().required().uuid(),
	libelle: yup.string(),
});

module.exports = { reponseValidator, reponseUpdatedValidator };
