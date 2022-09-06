const { Sequelize, DataTypes } = require('sequelize');

//! Models Score
//todo: scoreID --> UUID
//todo: score   --> float

/**
 *
 * @param {Sequelize} sequelize
 */
module.exports = (sequelize) => {
    const Score = sequelize.define('score', {
        scoreID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        score: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    });
    return Score;
};
