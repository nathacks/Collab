# Collab - Next.js & Prisma SaaS Starter

![GitHub Banner](public/image/github.jpg)

This project is a [Next.js](https://nextjs.org) application initialized with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and using [Prisma](https://www.prisma.io/) for database management. It also integrates [shadcn](https://ui.shadcn.com/) for UI components and [Better Auth](https://betterauth.dev/) for authentication.

## Project Overview

This project aims to provide a SaaS platform with workspace creation, enabling a file manager system. Future features will include chat functionality and a calendar system to enhance collaboration within workspaces.

## Prerequisites

Before starting, make sure you have the following tools installed on your machine:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/) or another database supported by Prisma
- [Prisma CLI](https://www.prisma.io/docs/concepts/components/prisma-cli)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

## Installation

Clone the repository and install dependencies:

```bash
pnpm install
# or
npm install
# or
yarn install
```

## Configuration

Copy the `.env.example` file to `.env` and configure the environment variables:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
FOLDER_DATA=data
BETTER_AUTH_SECRET=..... # openssl rand -base64 32
GROQ_API_KEY=.......
```

## Prisma

Generate the Prisma client and apply migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### Important: Run Database Seeding Before Starting the Project

Before running the development server, make sure to seed the database with initial data:

```bash
npx prisma db seed
```

If you need to reset the database and apply the seeders again:

```bash
npx prisma migrate reset
npx prisma db seed
```

## Start the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Database Seeding

The project includes a seed script to populate the database with test data. Modify the `src/lib/prisma/seeds/seed.ts` file as needed.

Run the seed script:

```bash
npx prisma db seed
```

## Docker Setup for Production

To run the project in a production environment using Docker, use the provided `docker-compose.yml` file.

### Start the Containers

```bash
docker-compose up -d --build
```

### Stop the Containers

```bash
docker-compose down
```

### Docker Compose Configuration for Production

Below is the `docker-compose.yml` configuration used for running the application in production:

```yaml
services:
  db:
    image: postgres:15.6
    container_name: collab-nextjs-db
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=collab
      - POSTGRES_USER=collab
      - POSTGRES_PASSWORD=collab
    volumes:
      - collab_nextjs_db:/var/lib/postgresql/data

  app:
    container_name: collab-nextjs
    build:
      context: .
      dockerfile: Dockerfile
      args:
        - FOLDER_DATA
    environment:
      - DATABASE_URL=postgresql://collab:collab@db:5432/collab?schema=public
    restart: unless-stopped
    ports:
      - "3000:3000"
    depends_on:
      - db
    volumes:
      - collab_nextjs_data:/app/${FOLDER_DATA}

volumes:
  collab_nextjs_db:
  collab_nextjs_data:
```

### Note on Dockerfile

This project uses `pnpm` as the package manager in the Dockerfile. If you prefer to use `npm` or `yarn`, make sure to update the Dockerfile accordingly to replace `pnpm` commands with the package manager of your choice.

## Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Learn Next.js](https://nextjs.org/learn)

## Deployment

The easiest way to deploy your application is by using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

Happy coding! 🚀

