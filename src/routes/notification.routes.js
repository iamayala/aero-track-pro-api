const express = require("express")
const router = express.Router()

const notification = require("../controllers/notification.controller")

router.get("/", notification.get)

module.exports = router
