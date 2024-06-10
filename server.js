const cron = require("node-cron")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const http = require("http")

const app = express()
const server = http.createServer(app)

// CORS middleware
// app.use(cors())

const corsOptions = {
	origin: "*", // Allow all origins
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	allowedHeaders: "Content-Type,Authorization",
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routing
const userRoutes = require("./src/routes/user.routes")
const authRoutes = require("./src/routes/auth.routes")
const partRoutes = require("./src/routes/part.routes")
const documentRoutes = require("./src/routes/document.routes")
const orderRoutes = require("./src/routes/order.routes")
const aircraftRoutes = require("./src/routes/aircraft.routes")
const flightRoutes = require("./src/routes/flight.routes")
const maintenanceRoutes = require("./src/routes/maintenance.routes")
const dashboardRoutes = require("./src/routes/dashboard.routes")
const fakeFlightGenerator = require("./utils/fakeFlightGenerator")

app.use("/user", userRoutes)
app.use("/auth", authRoutes)
app.use("/part", partRoutes)
app.use("/document", documentRoutes)
app.use("/order", orderRoutes)
app.use("/aircraft", aircraftRoutes)
app.use("/flight", flightRoutes)
app.use("/maintenance", maintenanceRoutes)
app.use("/dashboard", dashboardRoutes)

// Cron job to create a new flight every 30 minutes
cron.schedule("*/30 * * * *", () => {
	fakeFlightGenerator.createFlight()
})

// Cron job to update aircraft data every 1 minute
cron.schedule("* * * * *", () => {
	fakeFlightGenerator.updateAircraftData()
	fakeFlightGenerator.endFlights()
})

// Default route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to your application." })
})

// Set port and start server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`)
})
