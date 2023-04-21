import express from "express";
import { login, register, forgotpwd} from "../controllers/userController.js";
// import getAllUser from "../controllers/userController.js";
// import { signUp,login } from "../controllers/userController.js";

const router = express.Router();

//router.get("/", getAllUser);
router.post("/signup", register);
router.post("/login", login);
router.post("/forgetpwd", forgotpwd);


export default router;