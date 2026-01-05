import express from "express";
import userAuth from "../middleware/userAuth.js";

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest" ,userAuth ,(req, res) => {
    const user = req.user;
    //sending an connection request
    console.log("Sending an connection request!!");

    res.send(user.firstName + " sent the connection request");
})


export default requestRouter;