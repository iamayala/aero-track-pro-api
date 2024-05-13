const router = require("express").Router()

const  auth = require("../controllers/auth.controller");

router.post("/login", auth.login);
router.post("/update-password", auth.updatePassword);

module.exports = router