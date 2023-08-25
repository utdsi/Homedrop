
const {report,get_reports} = require("../controller/reportController")
const {authenticate} = require("../middleware/authentication")

const express = require("express")
const reportRouter = express.Router()

reportRouter.post("/send-report",authenticate,report)

reportRouter.get("/get-history",authenticate,get_reports)


module.exports = {reportRouter}