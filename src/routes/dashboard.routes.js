const express = require("express")
const router = express.Router()

const dashboard = require("../controllers/dashboard.controller")

router.get("/flights/current-week", dashboard.getFlightsOfCurrentWeek)
router.get("/maintenance-activities", dashboard.getMaintenanceActivities)
router.get("/response-time-percentage", dashboard.getResponseTimePercentage)
router.get("/average-risk", dashboard.getAveragePriority)
router.get("/average-priority-per-month", dashboard.getAveragePriorityPerMonth)
router.get("/metrics", dashboard.getMetrics)

module.exports = router
