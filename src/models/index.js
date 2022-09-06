const { Sequelize } = require('sequelize');
const { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_SERVER, DB_PORT } = process.env;

//! Require : paramètre de connection de db
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
	host: DB_SERVER,
	port: DB_PORT,
	dialect: 'mysql',
});

//! initialisation
const db = {}; 
db.sequelize = sequelize;