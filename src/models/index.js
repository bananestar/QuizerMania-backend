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

//! set-up des models

db.User = require('./user')(sequelize);
db.Quiz = require('./quiz')(sequelize);
db.Score = require('./score')(sequelize);
db.Theme = require('./theme')(sequelize);
db.Question = require('./question')(sequelize);
db.Reponse = require('./reponse')(sequelize);
db.QuizQuestions = require('./quizQuestions')(sequelize);

//! Relation

//? User --> Score
db.User.hasMany(db.Score, {
	foreignKey: 'userID',
	onDelete: 'CASCADE',
	allowNull: false,
});

//? Score --> User
db.Score.belongsTo(db.User,{
	as:'user',
	foreignKey: 'userID',
})

//? Quiz --> score
db.Quiz.hasMany(db.Score, {
	foreignKey: 'quizID',
	onDelete: 'CASCADE',
	allowNull: false,
});

//? score --> Quiz
db.Score.belongsTo(db.Quiz,{
	as:'quiz',
	foreignKey: 'quizID',
})

//? Quiz --> quizquestions --> Question
db.Quiz.belongsToMany(db.Question, {
	through: 'quizQuestions',
	foreignKey: 'quizID',
	otherKey: 'questionID',
	onDelete: 'CASCADE',
	allowNull: false,
	timestamps: false,
});

//? Question --> quizquestions --> Quiz
db.Question.belongsToMany(db.Quiz, {
	through: 'quizQuestions',
	foreignKey: 'questionID',
	otherKey: 'quizID',
	onDelete: 'CASCADE',
	allowNull: false,
	timestamps: false,
});

//? theme --> Question
db.Theme.hasMany(db.Question, {
	foreignKey: 'themeID',
	onDelete: 'CASCADE',
	allowNull: false,
});

//? Question --> theme
db.Question.belongsTo(db.Theme,{
	as:'theme',
	foreignKey: 'themeID',
})

//? Question --> Reponse
db.Question.hasMany(db.Reponse, {
	foreignKey: 'questionID',
	onDelete: 'CASCADE',
	allowNull: false,
});

//? Reponse --> Question
db.Reponse.belongsTo(db.Question,{
	as:'question',
	foreignKey: 'questionID',
})

//! Export
module.exports = db;
