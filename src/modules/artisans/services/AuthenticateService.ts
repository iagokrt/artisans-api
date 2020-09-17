import { injectable, inject } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";
import Artisan from "../infra/typeorm/entities/Artisan";
import IArtisansRepository from "../repositories/IArtisansRepository";

interface Request {
  email: string;
  password: string;
}

interface Response {
  artisan: Artisan;
  token: string;
}

@injectable()
class AuthenticateService {
  constructor(
    @inject("ArtisansRepository")
    private artisansRepository: IArtisansRepository
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const artisan = await this.artisansRepository.findByEmail(email);

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
