import { getRepository, Repository } from "typeorm";

import IArtisansRepository from "@modules/artisans/repositories/IArtisansRepository";
import ICreateArtisanDTO from "@modules/artisans/dtos/ICreateArtisanDTO";

import Artisan from "../entities/Artisan";

class ArtisansRepository implements IArtisansRepository {
  private ormRepository: Repository<Artisan>;

  constructor() {
    this.ormRepository = getRepository(Artisan);
  }

  public async findById(id: string): Promise<Artisan | undefined> {
    const artisan = await this.ormRepository.findOne(id);

    return artisan;
  }

  public async findByEmail(email: string): Promise<Artisan | undefined> {
    const artisan = await this.ormRepository.findOne({
      where: { email },
    });

    return artisan;
  }

  public async save(artisan: Artisan): Promise<Artisan> {
    return this.ormRepository.save(artisan);
  }

  public async create({
    name,
    email,
    password,
    cpf,
    birthday,
  }: ICreateArtisanDTO): Promise<Artisan> {
    const artisan = this.ormRepository.create({
      name,
      email,
      password,
      cpf,
      birthday,
    });

    await this.ormRepository.save(artisan);

    return artisan;
  }

  // Add custom methods if need
}

export default ArtisansRepository;
