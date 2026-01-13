import validator from "validator";

const isValid = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error("Enter required fields!!");
    }
    if (!validator.isEmail(email)) {
        throw new Error("Enter a valid Email!!");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Enter a Strong password!!");
    }
}

const validateEditProfileData = (req) => {
    const allowedUpdates = [
        "firstName",
        "lastName",
        "email",
        "photoURL",
        "bio",
        "age",
        "gender",
        "skills",
    ];

    const isValid = Object.keys(req.body).every((key) =>
        allowedUpdates.includes(key)
    );
    return isValid;

}

export { isValid, validateEditProfileData };