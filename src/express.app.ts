/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import morgan from 'morgan';
import log from '@ajar/marker';
import cors from 'cors';
import config, { reLoadConfig } from './config.js';
import { watcher as config_watcher } from './config.js';

import { connect as connect_sqlDb } from './db/mysql.connection.js';
import individual_account_router from "./modules/individual/individual.router.js";
import business_account_router from "./modules/business/business.router.js";
import family_account_router from "./modules/family/family.router.js";
import change_status_router from "./modules/status/status.router.js";

import { generateRequestID } from './middleware/requestId.js';
import { errorLogger, not_found, responseWithError, urlNotFoundHandler } from './middleware/errors.handler.js';
import { appendToErrorLogger } from './middleware/loggers/error.log.js';
import { appendToRequestsLogger } from './middleware/loggers/http.log.js';

const { PORT, HOST } = config.express_server;
const { HTTP_LOG_FILE_PATH,ERRORS_LOG_FILE_PATH } = config;

class ExpressApp {
  app = express();

  private setMiddlewares() {
    this.app.use(express.json());
    this.app.use(generateRequestID);
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(appendToRequestsLogger(HTTP_LOG_FILE_PATH));
  }

  private setRoutings() {
    this.app.use("/api/individual", individual_account_router);
    this.app.use("/api/business", business_account_router);
    this.app.use("/api/family", family_account_router);
    this.app.use("/api", change_status_router);

  }

  private setErrorHandlers() {
    this.app.use(urlNotFoundHandler);
    this.app.use(errorLogger);
    this.app.use(appendToErrorLogger(ERRORS_LOG_FILE_PATH));
    this.app.use(responseWithError);
  }

  private setDefault() {
    this.app.use("*", not_found);
  }

  async start() {
    this.setMiddlewares();
    this.setRoutings();
    this.setErrorHandlers();
    this.setDefault();

    // connect to mySql
    await connect_sqlDb();

    // connect to server
    this.app.listen(Number(PORT), HOST);
    log.magenta('eBank API is live on', ` ✨ ⚡  http://${HOST}:${PORT} ✨ ⚡`);

    // sign config watcher to change events in config.json
    config_watcher.on('change',()=>{
      log.blue("Reloading config.json...");
      reLoadConfig();
      log.magenta("config.json loaded");
    });
  }
}

const instance = new ExpressApp();
export default instance;
