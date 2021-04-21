# pixel-art-api

## Dependencies

```
NodeJS >= 14.16.0
Yarn >= 1.22.10
Postgres >= 13
```

## Setup

Clone the project.
```console
$ git clone git@github.com:edumoreira1506/pixel-art-api.git
$ cd pixel-art-api
```

Copy the contents of the `.env.sample` to `.env` then change with the credentials of your local environment.

```console
$ cp .env.sample .env
```

Install all packages.
```console
$ yarn
```

For run server local.
```console
$ yarn dev
```

## Database

To run migrations.
```console
$ yarn db:migrate
```

## Tests

For run tests.
```console
$ yarn test
```

## Linter

For run eslint.
```console
$ yarn lint
```

## Models

![Models diagram](/src/docs/model-diagram.jpg?raw=true "Model diagram")
