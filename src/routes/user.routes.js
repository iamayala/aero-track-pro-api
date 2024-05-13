const express =  require("express");
const router = express.Router()

const  user = require("../controllers/user.controller.js");

// Create a new User
router.post("/", user.create);
router.get("/", user.get)
router.get("/:id", user.getOne)
router.put("/:id", user.put)
router.delete("/:id", user.delete)

module.exports = router