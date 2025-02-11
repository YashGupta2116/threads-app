import { Router } from "express";
import { login, signup } from "../controller/auth.controller.js";
import verifyJWT from '../middlewares/jwt.middleware.js'
const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(verifyJWT , login);

export default router;