import express from "express";
import { connectDB } from "./config/database.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestRouter from "./routes/request.js";
import userRouter from "./routes/user.js";
import cors from "cors";

const app = express();
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
}));
app.use(express.json());
app.use(cookieParser());


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

const startServer = async() => {
    try{
        await connectDB();
        console.log("Database connection Established")
        app.listen(1818 , () => {
            console.log("Server running on port 1818")
        } )
    }
    catch(err){
        console.log("Database Establishment error!!!")
    }
}

startServer();
