import express from "express";

import {auth,authAdmin} from "../midddlwares/auth.js"
import {signUp,logIn,getAllUsers} from "../controllers/user.js"

export const router=express.Router();

router.post("/",signUp);/////////
router.post("/login",logIn);
router.get("/",authAdmin,getAllUsers);

// export default router;
