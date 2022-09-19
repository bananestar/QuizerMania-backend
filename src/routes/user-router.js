const { FB_BUCKET, FB_CLIENTEMAIL, FB_PRIVATEKEY, FB_PROJECTID } = process.env;
const userController = require('../controllers/user-controller');
const authJWT = require('../middleware/auth-middleware');
const bodyValidation = require('../middleware/body-validation-middleware');
const { userUpdatedValidator } = require('../validators/user-validator');
const Multer = require('multer');
const FirebaseStorage = require('multer-firebase-storage');
const userRouter = require('express').Router();

//todo: params firebase
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
//! route getAll
userRouter.route('/').get(userController.getAll);

userRouter
	.route('/:id') //! url (../users/example.uuid)
	.get(userController.get) //! route get
	.put(authJWT(),bodyValidation(userUpdatedValidator), userController.update) //! route update
	.delete(authJWT(), userController.delete); //! route delete

userRouter.route('/updatedIMG/:id').post(authJWT(),multer.single('avatar'),userController.updateIMG)

module.exports = userRouter;
