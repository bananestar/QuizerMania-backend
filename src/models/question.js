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
        themeID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        libelle: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });
    return Question;
};
