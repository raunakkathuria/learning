# Node.js API with PgBouncer and PostgreSQL

This project demonstrates a simple Node.js application to connect to a PostgreSQL database through PgBouncer. It features a basic API that executes a `SELECT NOW()` query to return the current time from the database.

This project includes a `Dockerfile` and `docker-compose.yml` for containerization and easy deployment.

## Prerequisites

- Git
- Docker and Docker Compose

## Setup

```shell
$ git clone
$ cd
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

## License

[MIT](https://choosealicense.com/licenses/mit/)
