const { Sequelize, DataTypes } = require('sequelize');

//! Models Reponse
//todo: reponseID  --> UUID
//todo: libelle    --> text

/**
 *
 * @param {Sequelize} sequelize
 */
module.exports = (sequelize) => {
	const Reponse = sequelize.define(
		'reponse',
		{
			reponseID: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			libelle: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{
			tableName: 'reponse',
			timestamps: false,
		}
	);
	return Reponse;
};
