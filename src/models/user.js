const { Sequelize, DataTypes } = require('sequelize');

//! Models User
//todo: userID --> UUID
//todo: pseudo --> string
//todo: mail   --> string
//todo: img    --> varchar(3000)

/**
 *
 * @param {Sequelize} sequelize
 */
module.exports = (sequelize) => {
    const User = sequelize.define('user', {
        userID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        pseudo: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: {
                name: 'UK_User_Pseudo',
            },
        },
        email: {
            type: DataTypes.STRING(70),
            allowNull: false,
            email: {
                name: 'UK_User_Email',
            },
        },
        password: {
            type: DataTypes.CHAR(60),
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING(2000),
            allowNull: false,
            defaultValue:
                'https://firebasestorage.googleapis.com/v0/b/quizermania-f7be1.appspot.com/o/default.png?alt=media&token=f8b1b4b8-121d-4ffa-9e9c-bfbbf190f163',
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        tableName: 'User'
    });
    return User;
};