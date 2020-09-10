import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "@config/auth";

import AppError from "@shared/errors/AppError";

import Artisan from "../infra/typeorm/entities/Artisan";

interface Request {
  email: string;
  password: string;
}

interface Response {
  artisan: Artisan;
  token: string;
}

class AuthenticateService {
  public async execute({ email, password }: Request): Promise<Response> {
    const artisanEntity = getRepository(Artisan);

    const artisan = await artisanEntity.findOne({
      where: { email },
    });

    if (!artisan) {
      throw new AppError("Authentication Error", 401);
    }

    const trustedPassword = await compare(password, artisan.password);

    if (!trustedPassword) {
      throw new AppError("Authentication Error", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: artisan.id,
      expiresIn,
    });

    return {
      artisan,
      token,
    };
  }
}

export default AuthenticateService;
