import { Router } from "express";
import {
  getUser,
  login,
  logout,
  signup,
  updateProfile,
} from "../controller/auth.controller.js";
import verifyJWT from "../middlewares/jwt.middleware.js";
const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/update-profile").patch(verifyJWT, updateProfile);
router.route("/get-user").get(verifyJWT, getUser);
router.route("/logout").post(logout);

export default router;
