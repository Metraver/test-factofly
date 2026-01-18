import dotenv from 'dotenv';

dotenv.config({
  path: '.env.local',
});

export const config = {
  databaseUrl: process.env.DATABASE_URL,
};
