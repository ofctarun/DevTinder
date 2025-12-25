import express from "express";
import { connectDB } from "./config/database.js";
import User from "./models/user.js";
// import auth from "./middleware/auth.js"

// const { MongoClient } = require('mongodb');
// const uri = 'mongodb+srv://ofc_tarun:12345@namastenode.7fvpwio.mongodb.net/';
// const client = new MongoClient(uri);
         
const app = express();

// const getData = async () => {
//     await client.connect();
//     const database = client.db('HelloWorld');
//     const collection = database.collection("User");

//     const data = await collection.find({}).toArray();
//     return data;
// }

// app.get("/user",async (req ,res) => {
//     const arr = await getData();
//     res.json(arr);
// });

// app.get("/abc",[(req, res, next) => {
//     console.log("FROM 1");
//     next();
//     // res.send("FROM 1");

// },
// (req,res,next) => {
//     console.log("FROM 2");
//     // res.send("FROM 2");
//     next();
// }],
// (req, res)=>{
//     console.log("FROM 3");
//     res.send("FROM 3");
// }
// )

// app.post("/user",(req, res) => {
//     res.send("Data send to DB.");
// })

// app.use("/test" , (req ,res) => {
//     res.send("HELLO WORLD!!");
// })




// app.use("/users",auth)

// app.get("/users/getData", (req, res) => {
//     res.send("Data is sent.");
// })


// app.get("/getUsersData" , (req, res) => {
//     try{
//         throw new Error("RakthaPinjiri Roiiii");
//         res.send("Users Data sent!!");
//     }
//     catch(err){
//         res.status(501).send("err resolved in starting.")
//     }
// })


// app.use("/",(err, req, res, next)=>{
//     if(err)res.send("Please contact the support team!!");
// })

app.use(express.json());


app.post("/signup",async (req, res) => {
    // const userObj = {
    //     firstName : "arun",
    //     lastName : "Narayanashetti",
    //     age : "18"
    // }
    // const user = new User(userObj);
    // const user = new User(req.body);
    try{
        const result =  await User.findOne(req.body);
        res.send(result);
        // console.log("Added user");
    }
    catch(err){
        res.status(400).send(err);
    }
})


connectDB().then(() => {
    console.log("DataBase connection Established.");
    app.listen(1818, () => {
        console.log("Running on Port 1818.");
    })
})
.catch((err) => {
    console.log("DataBase Establishment error!!!");
})