const Validator = require('../../middleware/validator');

describe('Validator middleware', () => {
  test('Validation should pass', async () => {
    const next = jest.fn();
    const ctx = {
      request: {
        body: {},
      }
    };
    const schema = {
      validate: () => Promise.resolve()
    };
    await Validator.validate(schema, ctx, next);
    expect(next).toHaveBeenCalled();
  });

  test('Validation should fail', async () => {
    const next = jest.fn();
    const ctx = {
      body: jest.fn(),
      status: jest.fn(),
      request: {
        body: {},
      }
    };
    const schema = {
      validate: () => Promise.reject(new Error({ errors: [] })),
    };
    await Validator.validate(schema, ctx, next);
    expect(ctx.body).toHaveProperty('error');
    expect(ctx.status).toBe(422);
  });
});
