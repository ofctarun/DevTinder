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

export default isValid;