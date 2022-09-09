const { FB_BUCKET, FB_CLIENTEMAIL, FB_PRIVATEKEY, FB_PROJECTID } = process.env;
const userController = require('../controllers/user-controller');
const authJWT = require('../middleware/auth-middleware');
const bodyValidation = require('../middleware/body-validation-middleware');
const { userUpdatedValidator } = require('../validators/user-validator');
const Multer = require('multer');
const FirebaseStorage = require('multer-firebase-storage');
const userRouter = require('express').Router();

const multer = Multer({
	storage: FirebaseStorage({
		bucketName: FB_BUCKET,
		credentials: {
			clientEmail: FB_CLIENTEMAIL,
			privateKey: FB_PRIVATEKEY,
			projectId: FB_PROJECTID,
		},
		nameSuffix: '_Profil',
		unique: true,
		public: true,
	}),
});

userRouter.route('/').get(userController.getAll);

userRouter
	.route('/:id')
	.get(userController.get)
	.put(multer.single('img'),bodyValidation(userUpdatedValidator), userController.update)
	.delete(authJWT(), userController.delete);

module.exports = userRouter;
