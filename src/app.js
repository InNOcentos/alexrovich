const express = require("express");
const app = express();
const { PORT } = require("./utlis/constants");
const initDB = require("./dataBase");
const routes = require("./routes");
const { API_PREFIX } = require("./utlis/constants");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(API_PREFIX, routes);

initDB();

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Can't start server. Error: ${err}`);
  }
  console.log(`Listening on ${PORT}`);
});
