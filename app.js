require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const userService = require('./services/users');

const app = new Koa();

app.use(bodyParser());
app.use(logger());

app.use(userService.routes());
app.use(userService.allowedMethods());

module.exports = app;
