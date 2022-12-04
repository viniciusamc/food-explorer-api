const express = require("express");
const routes = require("./routes/index.js")

const app = express();
app.use(express.json())

app.use(routes)

const port = 3333;
app.listen(port, () => console.log(`Server is running on ${port}`))
