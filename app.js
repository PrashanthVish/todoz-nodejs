require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');

const app = new Koa();

app.use(bodyParser());
app.use(logger());

module.exports = app;
