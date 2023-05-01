import express, { Express } from "express";
import cors from "cors";
import http from "http";
import connectDB from "./db/connect";
import routes from "./routes";
import environmentVariables from "./config/environment-variables";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app: Express = express();
const port = environmentVariables.port;
const origin = environmentVariables.origin;
app.use(cors({ origin, credentials: true }));
app.use(cookieParser(environmentVariables.jwtSecret));

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));

const server = http.createServer(app);

server.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`);
  connectDB();
  routes(app);
});
