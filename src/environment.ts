import {ApolloServer} from '@apollo/server'
import {Neo4jGraphQL} from '@neo4j/graphql'
import neo4j from 'neo4j-driver'
import {typeDefs as nodeTypeDefs} from 'nodes'
import {ContextValue} from 'types'
import GraphqlOGM from '@neo4j/graphql-ogm'

const {OGM} = GraphqlOGM
export const IS_DEV = process.env.NODE_ENV === 'development'

if (!(process.env.DB_URL && process.env.DB_USERNAME && process.env.DB_PASSWORD))
  throw Error('Missing Environment Variables.')

export const driver = neo4j.driver(
  process.env.DB_URL,
  neo4j.auth.basic(process.env.DB_USERNAME, process.env.DB_PASSWORD),
)

const typeDefs = [nodeTypeDefs]

export const ogm = new OGM({typeDefs, driver})
await ogm.init()

export const neoSchema = new Neo4jGraphQL({
  typeDefs,
  driver,
  debug: IS_DEV,
  ...(process.env.JWT_SECRET && {
    features: {
      authorization: {
        key: process.env.JWT_SECRET,
      },
    },
  }),
})

const schema = await neoSchema.getSchema()

export const server = new ApolloServer<ContextValue>({
  schema,
  introspection: IS_DEV,
  includeStacktraceInErrorResponses: IS_DEV,
  stopOnTerminationSignals: true,
})

await ogm.assertIndexesAndConstraints({options: {create: true}})
await neoSchema.assertIndexesAndConstraints({options: {create: true}})
