require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { logger } = require("./config/logger");
const { http_responder } = require("./utils/http_response");
const BaseRouter = require("./routes");

// Init express
const app = express();

app.disable("x-powered-by");

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.use("/", BaseRouter);


// handle errors
app.all("/*", (req, res) => {
	return http_responder.sendResponse(
        res,
        null,
        "not found",
        "error",
		400
	);
});

app.use((err, req, res) => {
	logger.error(JSON.stringify(err.stack));
	return http_responder.sendResponse(
        res,
        null,
        err.message,
        "error",
		err.status || 500
	);
});

module.exports = { app };