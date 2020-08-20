const yup = require('yup');
const Validator = require('../../middleware/validator');

class UserValidator extends Validator {
  static async signUp(ctx, next) {
    const schema = yup.object().shape({
      fullName: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
    });
    await this.validate(schema, ctx, next);
  }

  static async signIn(ctx, next) {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    });
    await this.validate(schema, ctx, next);
  }
}

module.exports = UserValidator;
