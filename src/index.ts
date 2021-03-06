import dotEnv from 'dotenv'

dotEnv.config()

import Server from '@Config/server'
import { SERVER_PORT } from '@Constants/server'

Server.listen(SERVER_PORT, () => {
  console.log(`Online API on port ${SERVER_PORT}`)
})
