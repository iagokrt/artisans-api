import { injectable, inject } from "tsyringe";
import { hash } from "bcryptjs";

import AppError from "@shared/errors/AppError";

import Artisan from "../infra/typeorm/entities/Artisan";
import IArtisansRepository from "../repositories/IArtisansRepository";

interface Request {
  name: string;
  email: string;
  password: string;
  cpf: string;
  birthday: Date;
}

@injectable()
class CreateArtisanService {
  constructor(
    @inject("ArtisansRepository")
    private artisansRepository: IArtisansRepository
  ) {}

  public async execute({
    name,
    email,
    password,
    cpf,
    birthday,
  }: Request): Promise<Artisan> {
    const checkDuplicateEmail = await this.artisansRepository.findByEmail(
      email
    );

    if (checkDuplicateEmail) {
      throw new AppError("Email is already in use");
    }

    const bcryptedPassword = await hash(password, 8);

    const artisan = await this.artisansRepository.create({
      name,
      email,
      password: bcryptedPassword,
      cpf,
      birthday,
    });

    return artisan;
  }
}

export default CreateArtisanService;
