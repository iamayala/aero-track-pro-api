const express =  require("express");
const router = express.Router()

const  aircraft = require("../controllers/aircraft.controller");

router.post("/", aircraft.post);
router.get("/", aircraft.get);
router.get("/:id", aircraft.getOne);
router.put("/:id", aircraft.put);
router.delete("/:id", aircraft.delete);

module.exports = router