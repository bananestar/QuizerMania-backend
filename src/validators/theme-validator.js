const yup = require('yup');

//! validator form add theme
const themeValidator = yup.object().shape({
	name: yup.string().required().max(50),
});

module.exports = { themeValidator };
