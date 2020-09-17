import { Request, Response } from "express";
import { container } from "tsyringe";

import AuthenticateService from "@modules/artisans/services/AuthenticateService";

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateService);

    const { artisan, token } = await authenticateUser.execute({
      email,
      password,
    });

    delete artisan.password;

    return response.json({ artisan, token });
  }
}
