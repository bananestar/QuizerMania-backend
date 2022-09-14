const authRouter = require('./auth-router');
const questionRouter = require('./question-router');
const quizRouter = require('./quiz-router');
const reponseRouter = require('./reponse-router');
const scoreRouter = require('./score-router');
const themeRouter = require('./theme-router');
const userRouter = require('./user-router');

const router = require('express').Router();

//! route auth
router.use('/auth', authRouter);
//! route user
router.use('/users', userRouter);
//! route score
router.use('/score', scoreRouter);
//! route quiz
router.use('/quiz', quizRouter);
//! route question
router.use('/question', questionRouter);
//! route reponse
router.use('/reponse', reponseRouter);
//! route theme
router.use('/theme', themeRouter);

module.exports = router;
