# Chirp.io

## Setup instructions

- Clone the repo
- Run `docker-compose build` in project root
- Rename ./backend/src/.example.env to ./backend/src/.env
- Run `docker-compose run --rm npm_api install` and `docker-compose run --rm npm_ui install` to install npm dependencies
- Run `docker-compose run --rm prisma db push` followed by `docker-compose run --rm prisma db seed`
- Alternatively, can just run `docker-compose run --rm prisma migrate dev`
- By default it will use the root mariadb user (You can create another user and use it with appropriate permissions if needed)
- Run `docker-compose up -d api` which will start the api and database servers at ports 3000 and 3306 respectively
- Run `docker-compose run --rm ng serve` to start the frontend development server on port 4200
