const { Router } = require("express");
const { UserService, RefreshTokenService, LicenseService, ProductService } = require("../dataService");
const user = require("./user");
const license = require("./license");
const product = require("./product");
const db = require("../dataBase/models");

const app = new Router();

user(app, new UserService(db), new RefreshTokenService(db));
license(app, new LicenseService(db));
product(app, new ProductService(db));

module.exports = app;
