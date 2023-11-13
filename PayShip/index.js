const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const routes = require("./routes/api.js");
app.use(routes);

const ErrorHandler = require("./middlewares/errorHandler.js");
app.use(ErrorHandler);

async function run() {
    app.listen(PORT, () => {
        console.log(`API is listening on port ${PORT}`);
    });
}

run();
