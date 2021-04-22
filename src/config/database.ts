import { createConnection } from 'typeorm'

import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME } from '@Constants/database'

const isProduction = process.env.PRODUCTION === 'true'

export const databaseConfig = {
  type: 'postgres',
  host: DB_HOST,
  port: 5432,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: true,
  entities: [
    isProduction ? 'build/entities/*.js' : 'src/entities/*.ts'
  ],
  migrations: [
    isProduction ? 'build/database/migrations/**/*.js' : 'src/database/migrations/**/*.ts'
  ],
  subscribers: [],
  cli: {
    migrationsDir: isProduction ? 'build/database/migrations' : 'src/database/migrations'
  }
}

createConnection().then(() => console.log('Connected to the database'))
