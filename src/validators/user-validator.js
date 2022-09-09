const yup = require('yup');

//! validator form add user
const userValidator = yup.object().shape({
	pseudo: yup.string().trim().required().max(50),
	email: yup.string().email().trim().required().max(70),
	password: yup.string().trim().required().max(60),
});

//! validator form update user
const userUpdatedValidator = yup.object().shape({
	pseudo: yup.string().trim().max(50),
	email: yup.string().email().trim().max(70),
	password: yup.string().trim().max(60),
});

module.exports = { userValidator, userUpdatedValidator };
