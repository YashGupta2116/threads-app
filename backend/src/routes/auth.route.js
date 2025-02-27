import {Router} from 'express';
import {
  checkAuth,
  followUnfollowUser,
  getUser,
  getUserByUsername,
  login,
  logout,
  signup,
  updateProfile,
} from '../controller/auth.controller.js';
import verifyJWT from '../middlewares/jwt.middleware.js';
const router = Router();

//verifyJwt means protected route and gives back a req.user;

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/check').get(verifyJWT, checkAuth);
router.route('/get-user').get(verifyJWT, getUser);
router.route('/update-profile').patch(verifyJWT, updateProfile);
router.route('/follow/:followId').patch(verifyJWT, followUnfollowUser);
router.route('/profile/:username').get(getUserByUsername);

export default router;
