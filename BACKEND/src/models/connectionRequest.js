import mongoose from "mongoose";

const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Users",
            required : true,
        },
        toUserId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Users",
            required : true,
            index : true
        },
        status : {
            type : String,
            required : true,
            enum : {
                values : ["ignored" , "interested" , "accepted" , "rejected"],
                message : `{VALUE} is incorrect status type`
            }
        }
    },
    {timestamps : true}
);

connectionRequestSchema.index(
    { fromUserId: 1, toUserId: 1 },
    { unique: true }
);


connectionRequestSchema.pre("save", async function () {
    if(this.fromUserId.equals(this.toUserId))throw new Error("Cannot send connection req to yourself!!");
});

const ConnectionRequestModel = new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);

export default ConnectionRequestModel;