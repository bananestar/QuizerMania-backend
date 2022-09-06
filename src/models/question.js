const { Sequelize, DataTypes } = require('sequelize');

//! Models Question
//todo: questionID --> UUID
//todo: libelle    --> text

/**
 *
 * @param {Sequelize} sequelize
 */
module.exports = (sequelize) => {
    const Question = sequelize.define('question', {
        questionID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        libelle: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });
    return Question;
};
