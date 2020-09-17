import Artisan from "../infra/typeorm/entities/Artisan";
import ICreateArtisanDTO from "../dtos/ICreateArtisanDTO";

export default interface IArtisansRepository {
  findById(id: string): Promise<Artisan | undefined>;
  findByEmail(email: string): Promise<Artisan | undefined>;
  create(data: ICreateArtisanDTO): Promise<Artisan>;
  save(artisan: Artisan): Promise<Artisan>;
}
