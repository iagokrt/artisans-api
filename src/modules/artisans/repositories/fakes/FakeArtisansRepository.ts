import { uuid } from "uuidv4";

import IArtisansRepository from "@modules/artisans/repositories/IArtisansRepository";
import ICreateArtisanDTO from "@modules/artisans/dtos/ICreateArtisanDTO";

import Artisan from "../../infra/typeorm/entities/Artisan";

class FakeArtisansRepository implements IArtisansRepository {
  private artisans: Artisan[] = [];

  public async findById(id: string): Promise<Artisan | undefined> {
    const foundById = this.artisans.find((artisan) => artisan.id === id);

    return foundById;
  }

  public async findByEmail(email: string): Promise<Artisan | undefined> {
    const foundByEmail = this.artisans.find(
      (artisan) => artisan.email === email
    );

    return foundByEmail;
  }

  public async create(artisanInfo: ICreateArtisanDTO): Promise<Artisan> {
    const artisan = new Artisan();

    Object.assign(artisan, { id: uuid() }, artisanInfo);

    this.artisans.push(artisan);

    return artisan;
  }

  public async save(artisan: Artisan): Promise<Artisan> {
    const findIndex = this.artisans.findIndex(
      (findUser) => findUser.id === artisan.id
    );

    this.artisans[findIndex] = artisan;

    return artisan;
  }

  // Add custom methods if needed
}

export default FakeArtisansRepository;
