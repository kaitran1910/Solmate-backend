import { createConnection } from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";

import * as dotenv from "dotenv";
dotenv.config({
  path: "./.env.dev",
});

import logger from "./utils/logger";
import { PORT_NUMBER } from "./config";

// Import the router from the `./services` module
//  const  { router } = require("./services");
import router from "./services/routes";

// Attempt to establish a database connection before starting the server
createConnection()
  .then(async (connection) => {
    const app = express();

    // create express app
    app.use(bodyParser.json());
    app.use(cors());
    // app.use(logger);

    // Incorrectly way to mount the router at the root path ("/")
    // app.set('/', router);
    app.use("/", router);

    app.listen(PORT_NUMBER, () => {
      console.log(`Solmate Presale API has started on port ${PORT_NUMBER}.`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database: ", error);
  });
