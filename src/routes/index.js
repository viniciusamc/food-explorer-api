const { Router } = require("express");

const usersRouter = require("./users.routes");
const mealsRouter = require("./meal.routes");
const sessionsRouter = require("./sessions.routes");
const cartRoutes = require("./cart.routes");
const favRoutes = require("./favorites.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/meals", mealsRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/cart", cartRoutes);
routes.use("/favorites", favRoutes);
module.exports = routes;
