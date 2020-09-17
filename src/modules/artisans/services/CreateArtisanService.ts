import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import Artisan from "../infra/typeorm/entities/Artisan";
import IArtisansRepository from "../repositories/IArtisansRepository";

import IHashProvider from "../providers/HashProvider/models/IHashProvider";

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
    private artisansRepository: IArtisansRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
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

    const encryptedPassword = await this.hashProvider.generateHash(password);

    const artisan = await this.artisansRepository.create({
      name,
      email,
      password: encryptedPassword,
      cpf,
      birthday,
    });

    return artisan;
  }
}

export default CreateArtisanService;
