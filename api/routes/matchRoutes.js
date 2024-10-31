import express from "express";	
import { protecRoute } from "../middleware/protectRoute.js";
import { getMatches, getsUserprofiles, swipeLeft, swipeRight } from "../controllers/matchController.js";

const matchRouter = express.Router();

matchRouter.get('/all-matches',protecRoute,getMatches);
matchRouter.post('/swipe-right/:likedUserId',protecRoute,swipeRight);
matchRouter.post('/swipe-left/:dislikedUserId',protecRoute,swipeLeft);

matchRouter.get('/user-profiles',protecRoute,getsUserprofiles);

export default matchRouter;