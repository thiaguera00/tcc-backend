## Tecnologias

NestJS, NodeJs, TypeScript, Docker, Prisma e Prisma ORM

## Configurações iniciais do projeto

É necessário para está aplicação NodeJs na versão 20, Docker e alguma ferramenta de administração de banco de dados.

No terminal insira este comando:

```bash
$ npm install
```

Após a instalação de dependências é necessário criar um arquivo na raiz do projeto ".env" e inserir este comando:

```bash
DATABASE_URL= "postgresql://username:password@host:5432/database?schema=schema_name"
```

Substitua os campos necessarios para sua conexão com o SGBD.

## Compilando e rodando o projeto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Rodar testes

```bash
# unit testes
$ npm run test

# e2e testes
$ npm run test:e2e

# teste coverage
$ npm run test:cov
```
