import express from "express";
import { connectDB } from "./config/database.js";
import isValid from "./utils/validation.js";
import bcrypt from "bcrypt";
import User from "./models/user.js";

const app = express();
app.use(express.json());


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

        user.save();

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

        const isValidUser = await bcrypt.compare(password, dbUser.password);

        isValidUser ? res.send("User found!!") : res.send("Invalid Credentials!!");
        
    }
    catch(err){
        res.status(400).send("Error is : " + err);
    }
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
