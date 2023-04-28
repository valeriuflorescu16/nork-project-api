const express = require("express");
require("./db/mongoose");
require("dotenv").config();
const cors = require("cors");

const adminRouter = require("./routers/admin");
const emailRouter = require("./routers/email");

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(adminRouter);
app.use(emailRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
