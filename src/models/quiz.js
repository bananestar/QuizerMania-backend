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
			img: {
				type: DataTypes.STRING(2000),
				allowNull: false,
				defaultValue:
					'https://firebasestorage.googleapis.com/v0/b/quizermania-f7be1.appspot.com/o/quiz-dans-style-bande-dessinee-pop-art_175838-505.jpg?alt=media&token=5ccc9eb8-5e81-429f-9556-f78daefc04fc',
			},
		},
		{
			tableName: 'quiz',
		}
	);
	return Quiz;
};
