import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import matchRouter from "./routes/matchRoutes.js";
import messagesRouter from "./routes/messagesRoutes.js";
import { connectDb } from "./config/db.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/matches", matchRouter);
app.use("/api/messages", messagesRouter);

app.listen(PORT, () => {
  console.log("Server is running on port" + PORT);
  connectDb();
});
