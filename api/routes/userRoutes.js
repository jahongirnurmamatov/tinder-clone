import express from "express";	
import { protecRoute } from "../middleware/protectRoute.js";
import { updateProfile } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.put('/update',protecRoute,updateProfile);

export default userRouter;