// import cron from "node-cron";
// import {subDays,startOfDay,endOfDay} from "date-fns";
// import ConnectionRequestModel from "../models/connectionRequest.js";
// import { run } from "./sendEmail.js";

// cron.schedule("06 00 * * *",async() => {
//     try{
//         const yesterday = subDays(new Date(),1);
//         const yesterDayStart = startOfDay(yesterday);
//         const yesterDayEnd = endOfDay(yesterday);

//         const pendingRequests = await ConnectionRequestModel.find({
//             status : "interested",
//             createdAt : {
//                 $gte : yesterDayStart,
//                 $lt : yesterDayEnd
//             }
//         }).populate("fromUserId toUserId");

//         const lst = [...new Set(pendingRequests.map((ele) => ele.toUserId.email))];
//         for(const email of lst){
//             try{
//                 const res = await run(email,email,"");
//                 console.log(res);
//             }
//             catch(err){
//                 console.log(err);
//             }
//         }
//     }
//     catch(err){
//         console.log(err);
//     }
// })