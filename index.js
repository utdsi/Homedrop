const express = require("express")
const bodyParser = require('body-parser');

const app = express()
app.use(express.json())
app.use(bodyParser.json());
require('dotenv').config()

const db = require("./config/db.js")
const {userRouter} = require("./routes/userRoutes.js")
const {reportRouter} = require("./routes/reportRoutes.js")



app.get("/", (req, res) => {
    res.status(200).send("welcome to homedrop")
})

app.use("/",userRouter)
app.use("/",reportRouter)






module.exports={app}