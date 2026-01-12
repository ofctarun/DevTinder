import jsonwebtoken from "jsonwebtoken"
import User from "../models/user.js";

const userAuth = async (req, res, next) => {
    try {
        const jwt = req.cookies.token;
        if (!jwt) {
            throw new Error("Invalid Token");
        }
        const decodedToken = jsonwebtoken.verify(jwt, "SECRETKEY");
        const { Userid } = decodedToken;

        const user = await User.findById(Userid);
        if (!user) {
            throw new Error("User not found");
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(400).send("Auth Error : " + error);
    }
}

export default userAuth;