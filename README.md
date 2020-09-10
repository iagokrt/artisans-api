# # Fazenda-db

```
          .=     ,        =.
  _  _   /'/    )\,/,/(_   \ \
   `//-.|  (  ,\\)\//\)\/_  ) |
   //___\   `\\\/\\/\/\\///'  /
,-"~`-._ `"--'_   `"""`  _ \`'"~-,_
\       `-.  '_`.      .'_` \ ,-"~`/
 `.__.-'`/   (-\        /-) |-.__,'
   ||   |     \O)  /^\ (O/  |
   `\\  |         /   `\    /
     \\  \       /      `\ /
      `\\ `-.  /' .---.--.\
        `\\/`~(, '()      ('
         /(O) \\   _,.-.,_)
        //  \\ `\'`      /
  jgs  / |  ||   `""""~"`
     /'  |__||
           `o
```

## **FazendAPI | Node.js API + TypeScript**

Índice

1. Database Configuration - Docker & TypeORM
2. Routes Configuration - Auth & Token
3. Linting Configuration - Eslint & Prettier
4.

## ~~~~~**Database Configuration**~~~~~

Docker + TypeORM

O **Docker** é um container de banco de dados relacional.

Através de uma interface visual pode ser visualizado bancos e tabelas do banco que o container docker roda prá gente.

E.g.: Eu uso o PostBird, mas existem diversas outras opções.

~ **ormconfig.json**

```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "user",
  "password": "password",
  "database": "dbname",
  "entities": [
    "./src/modules/**/infra/typeorm/entities/*.ts"
  ],
  "migrations": [
    "./src/shared/infra/typeorm/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}
```

O **TypeORM** nos ajuda a lidar com as migrations no banco de dados.

```jsx
// Certifique-se de configurar o arquivo ormconfig-json.
// Certifique-se de estar rodando o banco de dados.
```

Cadastrando uma nova Entidade são **duas etapas** principais:

1. Configurar uma **migration**. Em ***@*shared/typeorm**
2. Criar a entidade (Object-Model). Em **@modules/***artisans***/infra/typeorm/entities**

Veja mais sobre as **migrations e models** do **typeorm** na **documentação**. [https://typeorm.io/](https://typeorm.io/)

### Exemplo de Entity (Object-Model)

```tsx
 import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("artisans")
class Artisan {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Artisan;
```

---

## ~~~~~**Routes Configuration**~~~~~

**Autenticação**: (AuthService + sessions.routes + authConfig)

```tsx
// Veja @modules/artisans/services/authenticateService.ts
// Veja @~artisans/infra/http/routes/sessions.routes.ts
// Veja ~config/auth-example.ts
```

**authenticateService.ts**

```tsx
import { compare } from "bcryptjs"; // verificar
import { sign } from "jsonwebtoken"; // gerando token
import authConfig from "@config/auth"; // configuração básica do token

// ~~~ example
		.
		.
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
```

```json
// Configuração do auth token
export default {
  jwt: {
    secret: "9cb9ce5bd9e807867d42a740c963f323",
    expiresIn: "2d",
  },
};
```

E a rota de **sessões utiliza do service de Authenticate.**

```tsx
// sessions.routes.ts
import { Router } from "express";

import AuthenticateUserService from "@modules/artisans/services/AuthenticateService";

const sessionsRouter = Router();

sessionsRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  const authenticate = new AuthenticateUserService();

  const { artisan, token } = await authenticate.execute({
    email,
    password,
  });

  delete artisan.password;

  return response.json({ artisan, token });
});

export default sessionsRouter;
```

ASCII ART Credits: ***Joan Stark***

**Entities**

Artisans / Equipments / Workshop / Products / Categories
