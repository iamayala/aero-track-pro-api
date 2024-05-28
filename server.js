const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const http = require("http")

const app = express()
const server = http.createServer(app)

// CORS middleware
app.use(cors())

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

app.use("/user", userRoutes)
app.use("/auth", authRoutes)
app.use("/part", partRoutes)
app.use("/document", documentRoutes)
app.use("/order", orderRoutes)
app.use("/aircraft", aircraftRoutes)
app.use("/flight", flightRoutes)
app.use("/maintenance", maintenanceRoutes)

// Default route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to your application." })
})

// Set port and start server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`)
})
