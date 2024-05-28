const express = require("express")
const router = express.Router()

const maintenance = require("../controllers/maintenance.controller")

router.post("/", maintenance.post)
router.get("/", maintenance.get)
router.get("/:id", maintenance.getById)
router.get("/technician/:id", maintenance.getByTechnicianId)
router.get("/aircraft/:id", maintenance.getByAircraftId)
router.put("/:id", maintenance.put)
router.delete("/:id", maintenance.delete)

module.exports = router
