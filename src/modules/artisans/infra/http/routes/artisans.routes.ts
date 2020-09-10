import { Router } from "express";

import CreateArtisanService from "@modules/artisans/services/CreateArtisanService";

import ensureAuthenticated from "../middlewares/ensureAuth";

const artisansRouter = Router();

artisansRouter.post("/", async (request, response) => {
  const { name, email, password, cpf, birthday } = request.body;

  const create = new CreateArtisanService();

  const user = await create.execute({
    name,
    email,
    password,
    cpf,
    birthday,
  });

  delete user.password;

  return response.json(user);
});
/*
usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
); */
export default artisansRouter;
