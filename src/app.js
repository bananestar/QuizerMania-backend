require('dotenv').config();
require('express-async-errors');

//! Require : config express + cors
const express = require('express');
const cors = require('cors');

const app = express();

//? config PORT + URL
const { PORT, URL } = process.env;

//! Initialisation cors + body-parser de express
app.use(cors());
app.use(express.json());

//! Import Models
const db = require('./models');
//? TryCatch sequelize
db.sequelize
	.authenticate()
	.then(() => console.log('Connection DB => ok'))
	.catch((errors) => console.log('Connection DB => NOT OK!!', errors));

//! Forcing sync + alter ‼‼ Suppression donnée ‼‼
// db.sequelize.sync({ alter: true, force: true });

const router = require('./routes');

app.use('/api', router);

//! Listen 
app.listen(PORT, () => {
	console.warn(`Listening => ${URL}${PORT}`);
});

const { seedUser, seedAdmin, seedTheme, seedQuiz, seedScore } = require('./utils/seed-utils');
// seedUser(10)
// seedAdmin()
// seedScore(100)
// seedTheme()
// seedQuiz();
