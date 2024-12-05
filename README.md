# URL Shortener API

Este é um serviço de encurtamento de URL com funcionalidade de contabilização de cliques, autenticação de usuários e gerenciamento de URLs encurtadas. O serviço foi implementado com **Node.js**, utilizando **PostgreSQL** para o armazenamento de dados e **Redis** para contabilizar os cliques.

## Tecnologias Usadas

- **Node.js** (versão estável)
- **NestJS** (framework para Node.js)
- **PostgreSQL** (banco de dados relacional)
- **Redis** (armazenamento para contagem de cliques)
- **Docker** (para containerização dos serviços)
- **PrismaORM** (para ORM com PostgreSQL)
- **JWT** (para autenticação via token)

## Pré-requisitos

- Docker e Docker Compose instalados
- Node.js e npm instalados (caso queira rodar a aplicação sem Docker)

## Como Rodar o Projeto

Este projeto pode ser executado utilizando **Docker** para facilitar a configuração dos serviços. Siga os passos abaixo para rodar a aplicação no seu ambiente local.

### Passo 1: Clone o repositório

Clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/Douglas-00/Api-EncurtadorURLS.git
cd ....
```

### Passo 2: Configuração do Ambiente

O serviço depende de variáveis de ambiente.

```bash
DATABASE_URL=postgresql://root:password@localhost:5432/url_shortener
REDIS_URL=redis://localhost:6379
BASE_URL="http://localhost:3000"
JWT_SECRET="secret"
JWT_EXPIRATION_TIME="3600"
```

### Passo 3: Subir os Containers com Docker Compose

Com o arquivo .env configurado, você pode iniciar os serviços com o Docker Compose.

```bash
docker-compose up --build
```

### Passo 5: Executar Migration, criar tabelas.

```bash
npx prisma migrate dev
```

### Passo 6: Testar a aplicação

Com a aplicação rodando, você pode testar os endpoints usando o Postman ou qualquer outra ferramenta de API.

### Link Swagger

## http://localhost:3000/api#/

## Testes unitarios

npm run test
