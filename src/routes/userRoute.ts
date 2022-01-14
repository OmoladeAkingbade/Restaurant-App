import express from "express";
import userController from "../controllers/userController";
import createUser from "../controllers/userController";
import { signup } from "../controllers/auth-controller";
import {login} from "../controllers/auth-controller"

const router = express.Router();

// router.post("/signup", signup);

router
.route("/")
// .get(getAllUsers)
.post(createUser)


router.
route('/signup')
.post(signup)

router.
route('/login')
.post(login)

export default router;
