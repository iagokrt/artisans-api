import AppError from "@shared/errors/AppError";

import FakeArtisansRepository from "../repositories/fakes/FakeArtisansRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import CreateArtisanService from "./CreateArtisanService";

let fakeArtisansRepository: FakeArtisansRepository;
let fakeHashProvider: FakeHashProvider;
let createArtisan: CreateArtisanService;

describe("CreateArtisan", () => {
  beforeEach(() => {
    fakeArtisansRepository = new FakeArtisansRepository();
    fakeHashProvider = new FakeHashProvider();

    createArtisan = new CreateArtisanService(
      fakeArtisansRepository,
      fakeHashProvider
    );
  });

  it("should be able to create a new artisan", async () => {
    // create an artisan and checking if her/him have an uuid
    const user = await createArtisan.execute({
      name: "Jane Doe",
      email: "janedoe@hotmail.com",
      password: "1234",
      cpf: "123456789-01",
      birthday: new Date(1971, 5, 21),
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create new user if email already exists", async () => {
    // create an artisan with an email
    await createArtisan.execute({
      name: "Jane Doe",
      email: "email@same.com",
      password: "1234",
      cpf: "123456789-01",
      birthday: new Date(1971, 5, 21),
    });

    // the execute of creating an artisan should be an error instance
    // if execute creationing has the same email
    await expect(
      createArtisan.execute({
        name: "Another Jane Doe",
        email: "email@same.com",
        password: "1234",
        cpf: "987654321-01",
        birthday: new Date(1971, 5, 21),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
