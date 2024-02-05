# Node.js API with PgBouncer and PostgreSQL

This project demonstrates a simple Node.js application to connect to a PostgreSQL database through PgBouncer. It features a basic API that executes a `SELECT NOW()` query to return the current time from the database.

This project includes a `Dockerfile` and `docker-compose.yml` for containerization and easy deployment.

## Prerequisites

- Git
- Docker and Docker Compose

## Setup

```shell
$ git clone git@github.com:raunakkathuria/learning.git
$ cd nodejs-pgbouncer-postgres
```

### Environment variables

Create a `.env` file in the project root to store your environment variables securely.

```shell
# copy env.example to .env
$ cp env.example .env
# update the parameters as per your set up or
# you can use the default one for local testing
```

### Generate PgBouncer userlist

```shell
bash generate-userlist.sh
```

## Running the application

```shell
$ docker compose up
# test your set up
# assuming your APP_PORT is set to 4000 in .env
$ curl 0.0.0.0:4000/api/time
[{"now":"2024-02-05T04:56:10.398Z"}]
```

## API Endpoints

- `GET /api/time` - Returns the current time from the PostgreSQL database.

## Note

- This project uses [edoburu/docker-pgbouncer](https://github.com/edoburu/docker-pgbouncer) for PgBouncer container.This module defaults to md5 for password authentication whereas postgres 14+ uses `scram-sha-256` by default.
- You can use `POSTGRES_HOST_AUTH_METHOD` environment varialble to make postgres use `md5` - [official postgres container](https://hub.docker.com/_/postgres).
- In this example, we are using `AUTH_MODE` as `trust` for `pgbouncer`, and `userlist.txt` uses a plain password.
- You can use [generate userlist](https://github.com/edoburu/docker-pgbouncer/blob/299d2d4bae1d82dc1fe94834e3a1ada275574527/examples/generate-userlist#L1) to generate md5 based userlist file

## License

[MIT](https://choosealicense.com/licenses/mit/)
