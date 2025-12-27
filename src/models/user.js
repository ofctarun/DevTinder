import mongoose from "mongoose";
import validator from "validator";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 4,
        maxLength: 20
    },
    lastName: {
        type: String,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: "Not a valid mail"
        }
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 1,
        max: 120
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        lowercase: true,
        validate: {
            validator: function (value) {
                return ["male", "female", "other"].includes(value);
            },
            message: "Gender is invalid"
        }
    },
    createdBy: {
        type: String,
        default: "System"
    }
},
    { timestamps: true });

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jsonwebtoken.sign({ Userid: user._id }, "SECRETKEY", { expiresIn: '1d' });
    return token;
}

userSchema.methods.validatePassword = async function (passwordByUser) {
    const user = this;
    const passwordHash = user.password;
    const isValid = await bcrypt.compare(passwordByUser, passwordHash);
    return isValid;
}


const User = mongoose.model("Users", userSchema);

export default User;