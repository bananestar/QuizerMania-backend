const userRouter = require('./user-router');

const router = require('express').Router();

router.use('/users', userRouter);

module.exports = router;
