export default function auth (req,res,next) {
    const userId = 123;
    const isUserValid = userId === 123;
    if(!isUserValid){
        return res.status(401).send("User is UnAuth!");
    }
    next();
}