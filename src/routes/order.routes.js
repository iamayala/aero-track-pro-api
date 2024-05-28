const express = require("express")
const router = express.Router()

const order = require("../controllers/order.controller")

router.post("/", order.post)
router.get("/", order.get)
router.get("/:id", order.getOne)
router.put("/:id", order.put)
router.delete("/:id", order.delete)

module.exports = router
