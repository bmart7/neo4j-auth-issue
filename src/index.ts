import {startStandaloneServer} from '@apollo/server/standalone'
import {ogm, server, driver} from 'environment'

const {url} = await startStandaloneServer(server, {
  listen: {port: 4000},
  context: async ({req}) => ({token: req.headers.authorization, ogm, driver}),
})

console.log(`GraphQL server ready at ${url}`)
