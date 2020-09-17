import { Router } from "express";

import ArtisansController from "../controllers/ArtisansController";

// import ensureAuthenticated from "../middlewares/ensureAuth";

const artisansRouter = Router();
const artisansController = new ArtisansController();

artisansRouter.post("/", artisansController.create);

export default artisansRouter;
