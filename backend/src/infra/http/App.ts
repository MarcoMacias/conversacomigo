/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import logsole from "src/vendor/logsole";
import { router } from "./routes";
import Master from "@modules/websocket/namespaces/Master/main";

class App {
  public app: express.Application;
  public io: Server;
  public server: any;
  public namespace: Master;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this.middlewares();
    this.namespace = new Master(this.io);
  }

  private middlewares() {
    this.app.use(
      cors({
        exposedHeaders: ["x-total-count", "Content-Type", "Content-Length"],
      })
    );

    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json({ type: ["application/json", "text/plain"] }));
    this.app.use(router);

    logsole.info("Middlewares ok");
  }
}

export default App;
