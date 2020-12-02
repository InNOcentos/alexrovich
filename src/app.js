const express = require("express");
const app = express();
const { PORT } = require("./utlis/constants");
const initDB = require("./dataBase");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

initDB();

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Can't start server. Error: ${err}`);
  }
  console.log(`Listening on ${PORT}`);
});
