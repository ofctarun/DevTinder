import validator from "validator";

const isValid = (req, res) => {
    const {firstName , email , password} = req.body;
    if(!firstName || !email || !password){
        throw new Error("Enter required fields!!");
    }
    if(!validator.isEmail(email)){
        throw new Error("Enter a valid Email!!");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Enter a Strong password!!");
    }
}

const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "gender" , "age", "createdBy"];
    const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));
    return isEditAllowed;
}

export  {isValid, validateEditProfileData };