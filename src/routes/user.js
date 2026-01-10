import express from "express";
import userAuth from "../middleware/userAuth.js";
import ConnectionRequest from "../models/connectionRequest.js"

const userRouter = express.Router();

const USER_SAFE_DATA = "firstName email";

userRouter.get("/user/requests/received" , userAuth , async(req ,res) => {
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId : loggedInUser._id,
            status : "interested"
        }).populate("fromUserId" , USER_SAFE_DATA);

        res.json({
            message : "Data fetched Successfully",
            data : connectionRequests
        })
    }
    catch(err){
        res.status(400).send("ERROR : " + err);
    }
})

userRouter.get("/user/connections", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {toUserId : loggedInUser._id , status : "accepted"},
                {fromUserId : loggedInUser._id , status : "accepted"},
            ],
        }).populate("fromUserId" , USER_SAFE_DATA).populate("toUserId" , USER_SAFE_DATA)

        const data = connectionRequests.map((row) => {
            return row.fromUserId._id.equals(loggedInUser._id) ? row.toUserId : row.fromUserId;
        });

        res.json({
            message : "User connections found!!",
            data 
        })
    }
    catch(err){
        res.status(400).send("ERROR : " + err);
    }
})

export default userRouter;