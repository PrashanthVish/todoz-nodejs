const jwt = require('jsonwebtoken');
const User = require('../../database/models/users');

class UserController {
  static async signUp(ctx) {
    try {
      const { fullName, email, password } = ctx.request.body;
      await User.insert({ fullName, email, password });
      ctx.status = 201;
      ctx.body = { success: true };
    } catch (e) {
      ctx.status = 500;
      ctx.body = { error: 'Unexpected error' };
    }
  }

  static async signIn(ctx) {
    try {
      const { email, password } = ctx.request.body;
      const user = await User.getById({ email });

      if (typeof user === 'undefined') throw new Error('user_does_not_exist');

      if (!User.isValidPassword({ hashedPassword: user.password, password })) {
        throw new Error('password_incorrect');
      }
      delete user.password;
      const token = await jwt.sign(
        { userId: user.id, name: user.fullName },
        process.env.NODE_ENV === 'test' ? 'testKey' : process.env.APP_SECRET,
        { expiresIn: '7 days', algorithm: 'HS512', issuer: 'todoz' }
      );

      ctx.body = { token };
    } catch (e) {
      switch (e.message) {
        case 'user_does_not_exist':
          ctx.status = 404;
          ctx.body = { error: 'user does not exit' };
          break;
        case 'password_incorrect':
          ctx.status = 401;
          ctx.body = { error: 'invalid password' };
          break;
        default:
          ctx.status = 500;
          ctx.body = { error: 'Unexpected error' };
          break;
      }
    }
  }
}

module.exports = UserController;
