require('express-async-errors')
const database = require("./database/sqlite")
const express = require("express");

const routes = require("./routes/index.js");

const AppError = require("./utils/AppError.js");

const app = express();
app.use(express.json())

app.use(routes)

database();

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      statusCode: error.message
    })
  }

  console.error(error)

  return response.status(500).json({
    message: 'internal server error'
  })
})

const port = 3333;
app.listen(port, () => console.log(`Server is running on ${port}`))
