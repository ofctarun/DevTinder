import express from "express";
import { connectDB } from "./config/database.js";
import isValid from "./utils/validation.js";
import bcrypt from "bcrypt";
import User from "./models/user.js";
import cookieParser from "cookie-parser";
import auth from "./middleware/auth.js"

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/createUser" , async (req, res) => {
    try{
        isValid(req);

        const {firstName, email, password} = req.body;
        //hash
        const hashedPassword = await bcrypt.hash(password,10);
        
        const user = new User({
            firstName : firstName,
            email : email,
            password : hashedPassword
        });

        await user.save();

        res.status(200).send("Created User Successfully!!!");
    }
    catch(error){
        res.status(400).send("Error is : " + error);
    }
})



app.post("/checkUser" , async (req, res) => {
    try{
        isValid(req);

        const {email, password} = req.body;

        const dbUser = await User.findOne({email : email});

        if(!dbUser)throw new Error("User not found with this email!!");

        const isValidUser = await dbUser.validatePassword(password);

        if(isValidUser) {
            //JWT token 
            const token = await dbUser.getJWT();
            // console.log(token);

            //create a cookie with jwt
            res.cookie("token",token,{
                expires : new Date(Date.now() + 8 * 3600000)
            });
            res.send("User found!!");
        }
        else {
            res.send("Invalid Credentials!!");
        }
        
    }
    catch(err){
        res.status(400).send("Error is : " + err);
    }
})


app.get("/profile" ,auth, async (req, res) => {
    res.send(req.user);
})


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
