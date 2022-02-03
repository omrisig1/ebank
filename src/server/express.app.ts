import express from 'express';
import morgan from 'morgan';
import log from '@ajar/marker';
import cors from 'cors';
import config from '../../config.json';

import { connect as connect_sqlDb } from './db/mysql.connection.js';

const { PORT, HOST = 'localhost' } = config['express-server'];

class ExpressApp {
  app = express();

  private setMiddlewares() {
    this.app.use(cors());
    this.app.use(morgan('dev'));
  }

  //   private setRoutings() {
  // this.app.use("/api/artists", artist_controller);
  // this.app.use("/api/songs", song_controller);
  // this.app.use("/api/playlists", playlist_controller);
  // this.app.use("/api/users", user_controller);
  // this.app.use("/api", auth_controller);
  //   }

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
    // this.setRoutings();
    // this.setErrorHandlers();
    // this.setDefault();

    // connect to mySql
    await connect_sqlDb();

    await this.app.listen(Number(PORT), HOST as string);
    log.magenta('eBank API is live on', ` ✨ ⚡  http://${HOST}:${PORT} ✨ ⚡`);
  }
}

const instance = new ExpressApp();
export default instance;
