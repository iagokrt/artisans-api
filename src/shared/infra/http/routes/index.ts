import { Router } from "express";

import artisansRouter from "@modules/artisans/infra/http/routes/artisans.routes";
import sessionsRouter from "@modules/artisans/infra/http/routes/sessions.routes";

const routes = Router();

routes.use("/artisans", artisansRouter);
routes.use("/sessions", sessionsRouter);

export default routes;
