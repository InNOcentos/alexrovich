const { Router } = require("express");
const { UserService, RefreshToken } = require("../dataService");
const user = require("./user");
const db = require("../dataBase/models");

const app = new Router();

user(app, new UserService(db), new RefreshToken(db));

module.exports = app;
