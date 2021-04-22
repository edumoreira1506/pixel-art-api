const isProduction = process.env.PRODUCTION === 'true'
const databaseConfigPath = isProduction ? './build/config/database' : './src/config/database'

const { databaseConfig } = require(databaseConfigPath)

module.exports = databaseConfig
