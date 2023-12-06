import express from "express";
import cors from "cors";

import routerUser from "./routes/userRoutes";

class App {
    public server: express.Application;
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(cors());
    }

    routes() {
        this.server.use("/users", routerUser);
    }
}

export default new App().server;
