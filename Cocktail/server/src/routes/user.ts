import { Router } from 'express';
import controller from '../controllers/user';
import validation from '../middleware/validation';
import * as passport from 'passport';
import { UserRegisterSchema, UserLoginSchema, UserChangeNameSchema, UserChangePasswordSchema } from '../interfaces/yupValidiationModels';
const router = Router();

router.post('/register', validation(UserRegisterSchema), controller.register);
router.post('/login', validation(UserLoginSchema), controller.login);
router.post('/refreshToken', controller.refreshToken);
router.post('/logout', passport.authenticate('jwt', { session: false }), controller.logout);
router.get('/getuser', passport.authenticate('jwt', { session: false }), controller.getUser);
router.get('/allusers', passport.authenticate('jwt', { session: false }), controller.allUsers);
router.get('/find/:userId', passport.authenticate('jwt', { session: false }), controller.findUser);
router.post('/updateuser/:userId', passport.authenticate('jwt', { session: false }), controller.updateUser);

router.post('/changeName/:userId', passport.authenticate('jwt', { session: false }), validation(UserChangeNameSchema), controller.changeName);
router.post(
	'/changePassword/:userId',
	passport.authenticate('jwt', { session: false }),
	validation(UserChangePasswordSchema),
	controller.changePassword,
);
export { router };
