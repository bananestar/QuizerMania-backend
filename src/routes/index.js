const authRouter = require('./auth-router');
const questionRouter = require('./question-router');
const quizRouter = require('./quiz-router');
const userRouter = require('./user-router');

const router = require('express').Router();

//! route auth
router.use("/auth", authRouter);
//! route user
router.use('/users', userRouter);
//! route quiz
router.use('/quiz', quizRouter)
//! route question
router.use('/question',questionRouter)

module.exports = router;
