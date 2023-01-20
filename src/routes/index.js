const { Router } = require("express")

const usersRouter = require("./users.routes")
const mealsRouter = require("./meal.routes")

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/meals", mealsRouter)

module.exports = routes;
