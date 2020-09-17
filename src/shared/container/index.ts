import { container } from "tsyringe";

import IArtisansRepository from "@modules/artisans/repositories/IArtisansRepository";
import ArtisansRepository from "@modules/artisans/infra/typeorm/repositories/ArtisansRepository";

container.registerSingleton<IArtisansRepository>(
  "ArtisansRepository",
  ArtisansRepository
);
