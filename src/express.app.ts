import express from 'express';
import morgan from 'morgan';
import log from '@ajar/marker';
import cors from 'cors';
import config from '../config.json';

import { connect as connect_sqlDb } from './db/mysql.connection.js';
import individual_account_router from "./modules/individual/individual.router.js";
import business_account_router from "./modules/business/business.router.js";

const { PORT, HOST } = config['express-server'];

class ExpressApp {
  app = express();

  private setMiddlewares() {
    this.app.use(cors());
    this.app.use(morgan('dev'));
  }

  private setRoutings() {
    this.app.use("/api/individual", individual_account_router);
    this.app.use("/api/business", business_account_router);
  }

  //   private setErrorHandlers() {
  // this.app.use(urlNotFoundHandler);
  // this.app.use(errorLogger);
  // this.app.use(appendToErrorLogger(ERRORS_LOG_FILE_PATH as string));
  // this.app.use(responseWithError);
  // this.app.use(error_handler);
  // this.app.use(error_handler2);
  //   }

  //   private setDefault() {
  // this.app.use("*", not_found);
  //   }

  async start() {
    this.setMiddlewares();
    this.setRoutings();
    // this.setErrorHandlers();
    // this.setDefault();

    // connect to mySql
    await connect_sqlDb();

    this.app.listen(Number(PORT), HOST);
    log.magenta('eBank API is live on', ` ✨ ⚡  http://${HOST}:${PORT} ✨ ⚡`);
  }
}

const instance = new ExpressApp();
export default instance;
