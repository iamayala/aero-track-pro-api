const router = require("express").Router()

const auth = require("../controllers/auth.controller")

router.post("/login", auth.login)
router.put("/update-password", auth.updatePassword)

module.exports = router
