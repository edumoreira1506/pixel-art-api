import { createConnection } from 'typeorm'
import dotEnv from 'dotenv'

dotEnv.config()

export const databaseConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
  entities: [
    'src/entities/*.ts'
  ],
  migrations: [
    'src/database/migrations/**/*.ts'
  ],
  subscribers: [],
  cli: {
    migrationsDir: 'src/database/migrations'
  }
}

createConnection().then(() => console.log('Connected to the database'))
