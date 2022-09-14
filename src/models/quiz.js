const { Sequelize, DataTypes } = require('sequelize');

//! Models Quiz
//todo: quizID --> UUID
//todo: name   --> string

/**
 *
 * @param {Sequelize} sequelize
 */
module.exports = (sequelize) => {
	const Quiz = sequelize.define(
		'quiz',
		{
			quizID: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
		},
		{
			tableName: 'quiz',
		}
	);
	return Quiz;
};
