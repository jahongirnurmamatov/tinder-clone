import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import matchRouter from "./routes/matchRoutes.js";
import messagesRouter from "./routes/messagesRoutes.js";
import { connectDb } from "./config/db.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import {createServer} from 'http';
import { initializeSocket } from "./socket/socket.server.js";
import path from "path";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);

const __dirname = path.resolve();

initializeSocket(httpServer)

// middlewares
app.use(express.json());
app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials:true
  }
));
app.use(cookieParser());

// routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/matches", matchRouter);
app.use("/api/messages", messagesRouter);

if(process.env.NODE_ENV= 'production'){
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
  });
}

httpServer.listen(PORT, () => {
  console.log("Server is running on port" + PORT);
  connectDb();
});
