import {Driver} from 'neo4j-driver'
import {OGM} from '@neo4j/graphql-ogm'
// Uncomment the following line and update instances of `OGM` to `OGM<ModelMap>` after generating types
// import {ModelMap} from '__generated__/types'

export interface JWTDataPayload {
  tokenType: string
  exp: number
  iat: number
  jti: string
  sub: string
}

export interface ContextValue {
  jwt?: JWTDataPayload
  ogm: OGM //<ModelMap>
  driver: Driver
}
