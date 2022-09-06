const { Sequelize, DataTypes } = require('sequelize');

//! Models Theme
//todo: themeID --> UUID
//todo: name    --> string

/**
 *
 * @param {Sequelize} sequelize
 */
module.exports = (sequelize) => {
    const Theme = sequelize.define('theme', {
        themeID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    });
    return Theme;
};
