const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const connectionDb = require("./config/connectionDb");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHanlder");

connectionDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//API ROUTES
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/invoice", require("./routes/invoiceRoutes"));

//app.use(errorHandler);

app.listen(3001, () => console.log("Running Server"));
