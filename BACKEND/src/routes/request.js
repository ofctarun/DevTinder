import express from "express";
import userAuth from "../middleware/userAuth.js";
import ConnectionRequest from "../models/connectionRequest.js"
import User from "../models/user.js";
import { run } from "../utils/sendEmail.js";

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status type : " + status });
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            throw new Error("User not found");
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ],
        });

        if (existingConnectionRequest) {
            throw new Error("Connection Request Already Exists");
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();

        if (status === "interested") {
            try {
                const emailRes = await run(
                    toUser.email,    // Recipient email from DB
                    toUser.firstName,  // Recipient first name
                    req.user.firstName // Sender (logged-in user) name
                );
                console.log(emailRes);
            } catch (err) {
                console.error("Email failed to send, but request was saved.");
            }
        }


        res.json({
            message: req.user.firstName + " " + status + " " + toUser.firstName,
            data
        });
    }
    catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
})


requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Status not allowed!!" });
        }

        const connectionRequest = await ConnectionRequest.findOne({
            fromUserId: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        });
        if (!connectionRequest) return res.status(400).json({ message: "Connection request not found" });

        connectionRequest.status = status;

        const data = await connectionRequest.save();

        res.json({ message: "Connection request  " + status, data });

    }
    catch (err) {
        res.status(400).send("Error : " + err);
    }
}

)

export default requestRouter;