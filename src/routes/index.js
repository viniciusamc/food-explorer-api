const { Router } = require("express")

const usersRouter = require("./users.routes")
const mealsRouter = require("./meal.routes")
const sessionsRouter = require("./sessions.routes")

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/meals", mealsRouter)
routes.use("/sessions", sessionsRouter)

module.exports = routes;
