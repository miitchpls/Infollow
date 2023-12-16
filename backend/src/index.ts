import bodyParser from "body-parser";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import responseTime from "response-time";
import { ApiRouter } from "./routes/api.router";
import { LogManager } from "./utils/logManager.util";

const app: Application = express();
const PORT = 8080;

// Secure setting various HTTP headers
app.use(helmet());

// Middleware that records the response time for HTTP requests
app.use(responseTime());

// Logging http request in the console
app.use(morgan("combined", { stream: LogManager.getLogStream() }));

// Enabling receipt of parameters from forms
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

// Enabling json parsing from request body
app.use(express.json());

// Configuring routers
app.use("/api", ApiRouter);
app.get("/", (req, res) => {
  res.send("Infollow backend is running!");
});

// Starting the server
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
