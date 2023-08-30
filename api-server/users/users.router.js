const express = require ("express")
const controller = require("./users.controller")
const middleware = require("./users.middleware")
const bodyParser = require("body-parser")

const userRouter = express.Router()

userRouter.use(bodyParser.json())


userRouter.post("/", middleware.checkBody, controller.createUser)



module.exports = userRouter