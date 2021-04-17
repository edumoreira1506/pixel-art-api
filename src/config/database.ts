import { createConnection } from 'typeorm'

import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME } from '@Constants/database'

export const databaseConfig = {
  type: 'postgres',
  host: DB_HOST,
  port: 5432,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
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
