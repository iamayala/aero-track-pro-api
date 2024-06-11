const express = require("express")
const router = express.Router()

const reports = require("../controllers/reports.controller")

router.get("/compliance-reports", reports.getComplianceReports)

module.exports = router
