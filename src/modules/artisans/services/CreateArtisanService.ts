import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import AppError from "@shared/errors/AppError";

import Artisan from "../infra/typeorm/entities/Artisan";

interface Request {
  name: string;
  email: string;
  password: string;
  cpf: string;
  birthday: Date;
}

class CreateArtisanService {
  public async execute({
    name,
    email,
    password,
    cpf,
    birthday,
  }: Request): Promise<Artisan> {
    const artisanEntity = getRepository(Artisan);

    const checkDuplicateEmail = await artisanEntity.findOne({
      where: { email },
    });

    if (checkDuplicateEmail) {
      throw new AppError("Email is already in use");
    }

    const bcryptedPassword = await hash(password, 8);

    const user = artisanEntity.create({
      name,
      email,
      password: bcryptedPassword,
      cpf,
      birthday,
    });

    await artisanEntity.save(user);

    return user;
  }
}

export default CreateArtisanService;
