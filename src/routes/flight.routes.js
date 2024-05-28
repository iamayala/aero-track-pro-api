const express = require("express")
const router = express.Router()

const flight = require("../controllers/flight.controller")

router.post("/", flight.post)
router.get("/", flight.get)
router.get("/:id", flight.getOne)
router.put("/:id", flight.put)
router.delete("/:id", flight.delete)

module.exports = router
