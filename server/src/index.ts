import cors from "cors"
import express, { json, urlencoded } from "express"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import config from "./config/index"
import apiRoutes from "./routes/api.routes"
import onError from "./utils/onError"
import cookieParser from "cookie-parser"
import sequelize from "./database"

const __dirname = dirname(fileURLToPath(import.meta.url))

const isProduction = process.env.NODE_ENV === "production"

const app = express()

app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(json())
app.use(cookieParser())
app.use(urlencoded({ extended: true }))

app.use("/uploads", express.static(join(__dirname, "../../uploads")))

if (isProduction) {
  app.use(express.static(join(__dirname, "../../client/build")))
}

app.use("/api", apiRoutes)

app.use("*", (req, res) => {
  res.status(404).json({ message: `Route doesn't exists` })
})

app.use(onError)

try {
  await sequelize.authenticate()
  console.log("\n👍 Connection has been established successfully.")
} catch (error) {
  console.error("\n⛔ Unable to connect to the database:", error)
}

app.listen(config.port, () => {
  console.log("🚀 Server ready to handle requests")
})
