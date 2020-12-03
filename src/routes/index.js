const { Router } = require("express");
const { UserService, RefreshTokenService, LicenseService } = require("../dataService");
const user = require("./user");
const license = require("./license");
const db = require("../dataBase/models");

const app = new Router();

user(app, new UserService(db), new RefreshTokenService(db));
license(app, new LicenseService(db));

module.exports = app;
