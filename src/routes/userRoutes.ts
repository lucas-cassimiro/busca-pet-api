import { Router } from "express";

import { UserController } from "../app/controllers/UsersController";

const userRoutes = Router();

userRoutes.post("/", new UserController().create);

export default userRoutes;
