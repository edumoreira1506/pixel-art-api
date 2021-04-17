import Server from '@Config/server'

const port = process.env.PORT || 3000

Server.listen(port, () => {
  console.log(`Online API on port ${port}`)
})
