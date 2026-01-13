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
        lowercase: true,
        default: ""
    },
    email: {
        type: String,
        required: true,
        index: true,
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
        max: 120,
        default: 0
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
        },
        default: "male"
    },
    createdBy: {
        type: String,
        default: "System"
    },
    photoURL: {
        type: String,
        trim: true,
        validate: {
            validator: function (value) {
                return validator.isURL(value);
            },
            message: "Invalid photo URL"
        },
        default: "https://www.gravatar.com/avatar/?d=mp"
    },
    bio: {
        type: String,
        trim: true,
        minLength: 10,
        maxLength: 300,
        default: "",
        validate: {
            validator: function (value) {
                return value.length === 0 || value.length >= 10;
            },
            message: "Bio must be at least 10 characters long"
        },
        default: "Default Bio provide by System!!"
    },
    skills: {
        type: [String],
        default: ["eating", "sleeping", "shit"],
        lowercase: true,
        trim: true,
        validate: {
            validator: function (value) {
                return Array.isArray(value) && value.length <= 20;
            },
            message: "Skills array cannot exceed 20 items"
        }
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

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});


const User = mongoose.model("Users", userSchema);

export default User;