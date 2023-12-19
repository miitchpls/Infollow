import bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { argv } from "node:process";
import * as path from "path";
import responseTime from "response-time";
import { ApiRouter } from "./routes/api.router";
import { MockedApiRouter } from "./routes/mocked-api.router";
import { LogManager } from "./utils/logManager.util";

const app: Application = express();
const PORT = 8080;
const MOCKED = argv.includes("--mocked");
const corsOptions = {
  origin: ["http://localhost:4200"],
  optionsSuccessStatus: 200,
  credentials: true,
};

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

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Configuring routers
if (!MOCKED) {
  app.use("/api", ApiRouter);
} else {
  app.use("/assets", express.static(path.join(__dirname, "public")));
  app.use("/api", MockedApiRouter);
}

app.get("/", (req, res) => {
  res.send("Infollow backend is running!");
});

// Starting the server
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
