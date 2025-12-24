const express = require("express");

const app = express();

app.use("/" , (req ,res) => {
    res.send("HELLO WORLD!!");
})

app.listen(1818, () => {
    console.log("Running on Port 1818.");
})