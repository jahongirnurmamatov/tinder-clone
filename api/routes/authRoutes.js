import express from "express";	
import { login, logout, signup } from "../controllers/authController.js";
import { protecRoute } from "../middleware/protectRoute.js";

const authRouter = express.Router();

authRouter.post('/login',login);
authRouter.post('/signup',signup);
authRouter.post('/logout',logout);

authRouter.get("/me",protecRoute,(req,res)=>{res.send({success:true,user:req.user})});

export default authRouter;