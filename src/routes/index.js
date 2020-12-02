const { Router } = require("express");
const { UserService } = require("../dataService");
const user = require("./user");
const db = require("../dataBase/models");

const app = new Router();

user(app, new UserService(db));

module.exports = app;
