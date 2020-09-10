import { Router } from "express";

import AuthenticateUserService from "@modules/artisans/services/AuthenticateService";

const sessionsRouter = Router();

sessionsRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  const authenticate = new AuthenticateUserService();

  const { artisan, token } = await authenticate.execute({
    email,
    password,
  });

  delete artisan.password;

  return response.json({ artisan, token });
});

export default sessionsRouter;
