# Backend API - Gerenciamento de Usuários e Fases

Este projeto é uma API desenvolvida utilizando **Express.js** e **Prisma ORM** para o gerenciamento de usuários e fases de um sistema. A manipulação do banco de dados é realizada de forma eficiente com **PostgreSQL**.

## Padrão Camadas Adotado

- **Front end**: Faz requisições HTTP (REST/JSON) para os endpoints.
- **Camadas**:
  - Controladores (routes/controllers): Lógica de requisições HTTP.
  - Camada de serviços: Regras de negócio.
  - Camada de acesso a dados: Manipulação do banco de dados via Prisma ORM.

## Rotas

- **Setup inicial do projeto**:
  - Instalar dependências (Node.js, Express.js, Prisma, PostgreSQL)
  - Configurar arquivo `.env`

- **Modelo de entidades e banco**:
  - Criação do banco PostgreSQL
  - Migrações Prisma configuradas
  - Definição de relacionamentos

- **Endpoints**:
  - Usuários:
    - `GET /users`: Lista todos os usuários.
    - `POST /users`: Cria um novo usuário.
  - Fases:
    - `GET /phases`: Lista todas as fases.
    - `POST /phases`: Cria uma nova fase.

## Dependências

- **Node.js** com **Express.js** para construir a API.
- **Prisma ORM** para manipulação do banco de dados.
- **PostgreSQL** como banco de dados.
- **TypeScript** para tipagem estática.

## Classe de Configuração de Segurança

Configuração para controle de acesso (CORS, autenticação). Exemplos estão no código do projeto.

## Arquivos `.env` de Cada Profile do Projeto

- **application.env**
```env
DATABASE_URL=postgresql://<USUARIO>:<SENHA>@localhost:5432/<NOME_DO_BANCO>
```

## ATENÇÃO

**O projeto não roda localmente no profile de produção.** Caso deseje rodá-lo localmente, mude para o profile de desenvolvimento ou teste.

## Passo a Passo para Instalação

1. **Clone o repositório**:
```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DA_PASTA>
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Configure o banco de dados** e arquivo `.env`.

4. **Execute as migrações**:
```bash
npx prisma migrate dev
```

5. **Popule o banco de dados** (obrigatório):
```bash
npx ts-node prisma/index.ts
```

6. **Inicie o servidor**:
```bash
npm run dev
```

7. **Testes**:
  - Teste endpoints utilizando uma ferramenta como Postman ou Insomnia.

## Licença

Projeto sob a licença **MIT**. Sinta-se à vontade para modificar e utilizar conforme suas necessidades.

