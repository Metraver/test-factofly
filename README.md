# Project Setup

I've spent around 4-5 hours on test task

## To run the project you need 

### 1. install dependencies

    yarn

### 2. Environment variables

Create `.env.local` from the example file and run:

    npx auth secret

### 3. Setup database and seed data

Run:

    setup-db-and-seed

This command pulls a PostgreSQL image and seeds the database with Pokémon data.

Alternatively, run manually:

    npx prisma migrate deploy
    npm run seed

 you can change the amount of pokemons you want to pull here(`test-task/prisma/seeder.ts`), by default it is pulling 60 pokemons 

### 4. Start the application

    npm run dev
