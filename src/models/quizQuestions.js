const { Sequelize } = require('sequelize');

//! Models QuizQuestions
//todo: quizQuestionID  --> UUID

/**
 *
 * @param {Sequelize} sequelize
 */
module.exports = (sequelize) => {
    const QuizQuestions = sequelize.define('quizQuestions', {
        quizQuestionID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
    });
    return QuizQuestions;
};