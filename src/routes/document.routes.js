const express = require("express")
const router = express.Router()

const document = require("../controllers/document.controller")

router.post("/", document.post)
router.get("/", document.get)
router.get("/:id", document.getOne)
router.put("/:id", document.put)
router.delete("/:id", document.delete)

module.exports = router
