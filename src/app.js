const express = require("express");
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://ofc_tarun:12345@namastenode.7fvpwio.mongodb.net/';
const client = new MongoClient(uri);
         
const app = express();

const getData = async () => {
    await client.connect();
    const database = client.db('HelloWorld');
    const collection = database.collection("User");

    const data = await collection.find({}).toArray();
    return data;
}

app.get("/user",async (req ,res) => {
    const arr = await getData();
    res.json(arr);
});


app.post("/user",(req, res) => {
    res.send("Data send to DB.");
})

app.use("/test" , (req ,res) => {
    res.send("HELLO WORLD!!");
})

app.listen(1818, () => {
    console.log("Running on Port 1818.");
})