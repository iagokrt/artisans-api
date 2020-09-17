import AppError from "@shared/errors/AppError";

import FakeArtisansRepository from "../repositories/fakes/FakeArtisansRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";

import AuthenticateService from "./AuthenticateService";
import CreateArtisanService from "./CreateArtisanService";

let fakeArtisansRepository: FakeArtisansRepository;
let fakeHashProvider: FakeHashProvider;
let createArtisan: CreateArtisanService;
let authenticateUser: AuthenticateService;

describe("AuthenticateUser", () => {
  beforeEach(() => {
    fakeArtisansRepository = new FakeArtisansRepository();
    fakeHashProvider = new FakeHashProvider();

    createArtisan = new CreateArtisanService(
      fakeArtisansRepository,
      fakeHashProvider
    );

    authenticateUser = new AuthenticateService(
      fakeArtisansRepository,
      fakeHashProvider
    );
  });

  it("should be able to authenticate an artisan", async () => {
    // create an artisan to autenticate
    const user = await createArtisan.execute({
      name: "jane doe",
      email: "artisan@hotmail.com",
      password: "123456",
      cpf: "123456789-01",
      birthday: new Date(1971, 5, 21),
    });

    // auth the artisan
    const response = await authenticateUser.execute({
      email: "artisan@hotmail.com",
      password: "123456",
    });

    expect(response).toHaveProperty("token");
    expect(response.artisan).toEqual(user);
  });

  it("should not be able to auth with non existing user credentials", async () => {
    // without previosly creating an artisan this authentication should not pass
    await expect(
      authenticateUser.execute({
        email: "artisan@hotmail.com",
        password: "12345678",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to auth with wrong password", async () => {
    // create an artisan to test
    await createArtisan.execute({
      name: "jane doe",
      email: "artisan@hotmail.com",
      password: "123456",
      cpf: "123456789-01",
      birthday: new Date(1971, 5, 21),
    });

    await expect(
      authenticateUser.execute({
        email: "artisan@hotmail.com",
        password: "wrong-password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
