import express from "express";
import userAuth from "../middleware/userAuth.js";
import { validateEditProfileData } from "../utils/validation.js";

const profileRouter = express.Router();

profileRouter.get("/profile/view" ,userAuth , (req, res) => {
    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("Error : " + err.message);
    }
})

profileRouter.patch("/profile/edit",userAuth , async (req, res) => {
    try{
        if(!validateEditProfileData(req))throw new Error("Invalid edit request!!!");
        const loggedInUser = req.user;
        
        // Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);
        Object.assign(loggedInUser, req.body);
        await loggedInUser.save();

        res.send("Profile Edited Successfullyy!!!!")

    }
    catch(err){
        res.status(400).send("Error : " + err.message);
    }
})

profileRouter.post("/editPassword" ,userAuth , async (req, res) => {
    try{
        const { currPassword, newPassword } = req.body;
        const currUser = req.user;
        
        if(!currPassword || !newPassword){
            throw new Error("Both currentPassword and newPassword are required");
        }
        
        const isValidPassword = await currUser.validatePassword(currPassword);
        if(!isValidPassword)throw new Error("Entered password is wrong");

        const isSame = await currUser.validatePassword(newPassword);
        if (isSame) throw new Error("New password must be different from current password");

        currUser.password = newPassword;
        await currUser.save();

        res.status(200).send("Password Updated Successfully!!!");
    }
    catch(err){
        res.status(400).send("Error : " + err);
    }
})

export default profileRouter;