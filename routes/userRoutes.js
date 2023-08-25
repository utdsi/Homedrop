
const {auth} = require("../controller/userController")

const express = require("express")
const userRouter = express.Router()

userRouter.post("/auth",auth)


module.exports = {userRouter}
