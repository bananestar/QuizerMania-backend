const yup = require('yup');

//! validator form add theme
const themeValidator = yup.object().shape({
	themeID: yup.number().positive().integer().required(),
	name: yup.string().required().max(50),
});

//! validator form update theme

const themeUpdatedValidator = yup.object().shape({
	themeID: yup.number().positive().integer().required(),
	name: yup.string().max(50),
});

module.exports = { themeValidator, themeUpdatedValidator };
