const UserValidator = require('../../../services/users/validator');

describe('UserValidator', () => {
  test('should validate signUp successfully', async () => {
    const next = jest.fn();
    const ctx = {
      request: {
        body: {
          fullName: 'testUser',
          email: 'test@test.com',
          password: 'testpwd',
        }
      }
    };
    await UserValidator.signUp(ctx, next);
    expect(next).toHaveBeenCalled();
  });

  test('should validate signIn successfully', async () => {
    const next = jest.fn();
    const ctx = {
      request: {
        body: {
          email: 'test@test.com',
          password: 'testpwd',
        }
      }
    };
    await UserValidator.signIn(ctx, next);
    expect(next).toHaveBeenCalled();
  });
});
