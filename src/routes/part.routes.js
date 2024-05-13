const express =  require("express");
const router = express.Router()

const  parts = require("../controllers/part.controller");

router.post("/", parts.post);
router.get("/", parts.get);
router.get("/:id", parts.getOne);
router.put("/:id", parts.put);
router.delete("/:id", parts.delete);

module.exports = router