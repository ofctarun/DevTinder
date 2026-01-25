import express from "express";
import { connectDB } from "./config/database.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestRouter from "./routes/request.js";
import userRouter from "./routes/user.js";
import chatRouter from "./routes/chat.js";
import cors from "cors";
import {createServer} from "http";
import initializeSocket from "./utils/socket.js";
// import "./utils/cronjob.js";
import dotenv from "dotenv";
dotenv.config()

const app = express();
app.use(cors({
    origin: ["http://localhost:5173", "https://dev-tinder-pro.vercel.app/"],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/",chatRouter);


const server = createServer(app);
initializeSocket(server);

const startServer = async () => {
    try {
        await connectDB();
        console.log("Database connection Established")
        server.listen(process.env.PORT, () => {
            console.log("Server running on port 1818")
        })
    }
    catch (err) {
        console.log("Database Establishment error!!!")
    }
}

startServer();
