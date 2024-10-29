import express from "express";	
import { protecRoute } from "../middleware/protectRoute.js";
import { getConversation, sendMessage } from "../controllers/messageController.js";

const messagesRouter = express.Router();

messagesRouter.use(protecRoute);

messagesRouter.post('/send',sendMessage);
messagesRouter.post('/conversation/:userId',getConversation);


export default messagesRouter;