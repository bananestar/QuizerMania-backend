require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');

const app = express();
const { PORT, URL } = process.env;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
	console.warn(`Listening => ${URL}${PORT}`);
});