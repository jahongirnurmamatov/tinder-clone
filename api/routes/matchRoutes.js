import express from "express";	
import { protecRoute } from "../middleware/protectRoute.js";
import { getMatches, getsUserprofiles, swipeLeft, swipeRight } from "../controllers/matchController.js";

const matchRouter = express.Router();

matchRouter.post('/swipe-right/:likedUserId',protecRoute,swipeRight);
matchRouter.post('/swipe-left/:likedUserId',protecRoute,swipeLeft);

matchRouter.get('/',protecRoute,getMatches);
matchRouter.get('/user-profiles',protecRoute,getsUserprofiles);

export default matchRouter;