class Validator {
  static async validate(schema, ctx, next) {
    try {
      await schema.validate(ctx.request.body);
      next();
    } catch (e) {
      ctx.status = 422;
      ctx.body = { error: e.errors };
    }
  }
}

module.exports = Validator;
