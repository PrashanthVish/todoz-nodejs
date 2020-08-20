const Router = require('koa-router');
const UserController = require('./controller');
const UserValidator = require('./validator');

const app = new Router({
  prefix: '/users',
});

app.post('/signup', UserValidator.signUp, UserController.signUp);
app.post('/signin', UserValidator.signIn, UserController.signIn);
