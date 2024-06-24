import {startStandaloneServer} from '@apollo/server/standalone'
import {IS_DEV, ogm, server, driver} from 'environment'
import path from 'path'
import OGM from '@neo4j/graphql-ogm'
import fs from 'fs'

const {generate} = OGM

if (IS_DEV) {
  console.log('Generating Types...')
  const generatedDir = path.join(process.cwd(), 'src/__generated__')
  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir)
  }
  const outFile = path.join(generatedDir, 'types.ts')
  await generate({ogm, outFile})
  console.log('Types Generated')
}

const {url} = await startStandaloneServer(server, {
  listen: {port: 4000},
  context: async ({req}) => ({token: req.headers.authorization, ogm, driver}),
})

console.log(`GraphQL server ready at ${url}`)
