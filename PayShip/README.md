# PayShip

A service for managing payments and shipments of the application. created using Express js.

## Run in development mode


### Migrate and seed the database

```bash
cd data
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### Run the server

```bash
npm run dev
```