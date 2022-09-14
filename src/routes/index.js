const authRouter = require('./auth-router');
const quizRouter = require('./quiz-router');
const userRouter = require('./user-router');

const router = require('express').Router();

//! route auth
router.use("/auth", authRouter);
//! route user
router.use('/users', userRouter);

router.use('/quiz', quizRouter)

module.exports = router;
