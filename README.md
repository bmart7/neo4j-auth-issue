# <PROJECT_NAME>

Graphql API for <PROEJCT_NAME>

## Quickstart

1. Download [docker](https://docs.docker.com/get-docker/)
1. Install a [node manager](https://stackoverflow.com/questions/27425852/what-uses-respects-the-node-version-file). We'll use `nodenv` for the following examples
1. Install the version of node found in `.node-version`
   - `nodenv install -s && nodenv local`
1. Build and run docker images
   - `npm run up-build`

## Useful Commands

- build+start containers: `npm run up-build`
- start containers: `npm run up`
- kill containers: `npm run down`
- restart+recompile server: `npm run restart-server`
- follow server logs: `make logs-server`
- follow all logs: `make logs`

## Installing a New Package

1. install package
   - `npm i <package>`
1. restart server
   - `npm run restart-server`
