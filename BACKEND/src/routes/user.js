import express from "express";
import userAuth from "../middleware/userAuth.js";
import ConnectionRequest from "../models/connectionRequest.js"
import User from "../models/user.js";

const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName email bio age gender photoURL skills";

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

userRouter.get("/feed", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        limit = limit > 10 ? 10 : limit;

        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {fromUserId : loggedInUser._id},
                {toUserId : loggedInUser._id}
            ]
        }).select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString())
        })

        const users = await User.find({
            $and : [
                {_id : {$nin : Array.from(hideUsersFromFeed)}},
                {_id : {$ne : loggedInUser._id}}
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        res.send(users);

    }
    catch(err){
        res.status(400).json({message : err.message});
    }
})

export default userRouter;