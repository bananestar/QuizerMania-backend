const authRouter = require('./auth-router');
const userRouter = require('./user-router');

const router = require('express').Router();

//! route auth
router.use("/auth", authRouter);
//! route user
router.use('/users', userRouter);

module.exports = router;
