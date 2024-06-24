import {driver, ogm} from 'environment'
import repl from 'repl'

console.log('Starting REPL...\nEnvironment: ', process.env.NODE_ENV)

const r = repl.start()
r.context.ogm = ogm
r.context.driver = driver
