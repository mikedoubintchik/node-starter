# Node Starter

## Pre-requisites

- [Lando](https://lando.dev/)
- [NVM](https://github.com/nvm-sh/nvm)

## Usage

```bash
# Initiate
lando start
```

## Seed Database

To see the database with sample data, set:
`eraseDatabaseOnSync = true` (line 14) in `./src/server/index.js` - then set it to false after nodemon restarts
