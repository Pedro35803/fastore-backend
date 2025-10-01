# Backend - FastStore

Este é o backend da aplicação **FastStore**, desenvolvido em Node.js com TypeScript, utilizando Express, Prisma e Docker para facilitar o desenvolvimento e a implantação.

---

## Tecnologias utilizadas

- Node.js + TypeScript
- Express
- Prisma (ORM)
- PostgreSQL (ou outro banco configurado no `.env`)
- Docker e Docker Compose
- Redis
- JWT para autenticação
- Zod para validação de dados
- Jest + Supertest para testes

---

## Configuração do ambiente

1. **Copie o arquivo de exemplo do `.env`**:

```bash
cp .env.example .env
```

2. **Edite o `.env`** com suas credenciais:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="seu-segredo-aqui"
REDIS_URL="redis://localhost:6379"
PORT=3000
```

3. **Instale as dependências**:

```bash
npm install
```

---

## Scripts disponíveis

- **Iniciar o servidor em modo de desenvolvimento**:

```bash
npm run dev
```

- **Executar migrações do Prisma**:

```bash
npm run db:migrate
```

- **Resetar banco de dados com Prisma**:

```bash
npm run db:reset
```

- **Executar testes**:

```bash
npm run test
```

- **Resetar e subir containers Docker**:

```bash
npm run docker:reset
```

---

## Banco de dados

O projeto utiliza **Prisma** como ORM. Os arquivos de esquema estão em `prisma/schema.prisma`.

### Comandos úteis

- Gerar cliente Prisma:

```bash
npx prisma generate
```

- Criar migração:

```bash
npx prisma migrate dev --name <nome-da-migracao>
```

- Resetar banco:

```bash
npx prisma migrate reset
```

- Abrir Prisma Studio:

```bash
npx prisma studio
```

---

## Docker

O projeto possui suporte a Docker através do `docker-compose.yml`.

- Subir containers:

```bash
docker-compose up -d
```

- Parar containers:

```bash
docker-compose down
```

- Resetar ambiente Docker:

```bash
npm run docker:reset
```

---

## Estrutura do projeto

```
src/
├─ controllers/
├─ middlewares/
├─ models/
├─ routes/
├─ services/
├─ utils/
└─ index.ts
prisma/
├─ migrations/
└─ schema.prisma
.env
.env.example
docker-compose.yml
package.json
tsconfig.json
```

---

## Testes

O backend utiliza **Jest** e **Supertest** para testes automatizados.

```bash
npm run test
```

---

## Observações

- Certifique-se de que o banco de dados e o Redis estejam rodando antes de iniciar o servidor.
- Variáveis de ambiente são obrigatórias para o correto funcionamento do projeto.

