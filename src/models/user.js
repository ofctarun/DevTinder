import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
    firstname:{
        type : String,
        required : true,
        trim : true,
        minLength : 2,
        maxLength : 20
    },
    lastName : {
        type : String,
        trim : true,
        lowercase : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        validate : {
            validator : function(value){
                validator.isEmail(value);
            },
            message : "Not a valid mail"
        }
    },
    age : {
        type : Number,
        min : 1,
        max : 120
    },
    gender : {
        type : String,
        enum : ["male","female","other"],
        lowercase : true,
        required : true,
        validate : {
            validator : function(value){
                return ["male","female","other"].includes(value);
            },
            message : "Gender is invalid"
        }
    },
    createdBy : {
        type : String,
        default : "System"
    }
},
{timestamps : true});

const User = mongoose.model("Users",userSchema);

export default User;