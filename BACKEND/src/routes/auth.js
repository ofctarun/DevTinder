import express from "express";
import {isValid} from "../utils/validation.js";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
        isValid(req);

        const { firstName, email, password ,photoURL} = req.body;
        //hash
        //const hashedPassword = await bcrypt.hash(password, 10); --> USING PRE MIDDLE WARE!!

        const user = new User({
            firstName,
            email,
            password,
            photoURL
        });

        await user.save();

        res.status(200).send("Created User Successfully!!!");
    }
    catch (error) {
        res.status(400).send("Error is : " + error);
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        isValid(req);

        const { email, password } = req.body;

        const dbUser = await User.findOne({ email: email });

        if (!dbUser) throw new Error("User not found with this email!!");

        const isValidUser = await dbUser.validatePassword(password);

        if (isValidUser) {
            //JWT token 
            const token = await dbUser.getJWT();
            // console.log(token);

            //create a cookie with jwt
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000)
            });
            res.send(dbUser);
        }
        else {
            res.status(401).send("Invalid Credentials!!");
        }

    }
    catch (err) {
        res.status(400).send("Error is : " + err);
    }
})

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    })
    .send("Logout Successfull!!");
})

export default authRouter;