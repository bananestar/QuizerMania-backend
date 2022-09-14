const yup = require('yup');

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

//! validator form add user
const userValidator = yup.object().shape({
	pseudo: yup.string().trim().required().max(50),
	email: yup.string().email().trim().required().max(70),
	password: yup.string().trim().required().max(60),
	isAdmin: yup.mixed().default(function () {
		return false;
	}),
	createdAt: yup.date().default(function () {
		return new Date();
	}),
	updatedAt: yup.date().default(function () {
		return new Date();
	}),
});

//! validator form update user
const userUpdatedValidator = yup.object().shape({
	userID: yup.string().trim().required().uuid(),
	pseudo: yup.string().trim().max(50),
	email: yup.string().email().trim().max(70),
	password: yup.string().trim().max(60),
	img: yup
		.mixed()
		.nullable()
		.test(
			'Fichier taille',
			'upload file',
			(value) => !value || (value && value.size <= 1024 * 1024)
		)
		.test(
			'format',
			'upload file',
			(value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
		),
	updatedAt: yup.date().default(function () {
		return new Date();
	}),
});

module.exports = { userValidator, userUpdatedValidator };
