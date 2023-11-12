import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

import bodyParser from "body-parser";
app.use(bodyParser.json());

import routes from "./routes/api.js";
app.use(routes);

import ErrorHandler from "./middlewares/errorHandler.js";
app.use(ErrorHandler);


async function run() {
    app.listen(PORT, () => {
        console.log(`API is listening on port ${PORT}`);
    });
}

run();
