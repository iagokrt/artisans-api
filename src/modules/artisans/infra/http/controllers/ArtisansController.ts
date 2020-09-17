import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateArtisanService from "@modules/artisans/services/CreateArtisanService";

export default class ArtisansController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, cpf, birthday } = request.body;

    const createArtisan = container.resolve(CreateArtisanService);

    const artisan = await createArtisan.execute({
      name,
      email,
      password,
      cpf,
      birthday,
    });

    delete artisan.password;

    return response.json(artisan);
  }
}
