const UserController = require('../../../services/users/controller');
const User = require('../../../database/models/users');

describe('UserController', () => {
  afterAll(async () => {
    await User.getById({ email: 'test1@test.com' }).delete();
  });
  test('should signUp user successfully', async () => {
    const ctx = {
      body: jest.fn(),
      status: jest.fn(),
      request: {
        body: {
          fullName: 'testUser',
          email: 'test1@test.com',
          password: 'testpwd',
        }
      }
    };
    await UserController.signUp(ctx);
    expect(ctx.status).toBe(201);
    expect(ctx.body).toEqual(expect.objectContaining({ success: true }));
  });

  test('signUp fails because the body is empty', async () => {
    const ctx = {
      body: jest.fn(),
      status: jest.fn(),
      request: {
        body: {}
      }
    };
    await UserController.signUp(ctx);
    expect(ctx.status).toBe(500);
    expect(ctx.body).toEqual(expect.objectContaining({ error: 'Unexpected error' }));
  });

  test('signIn should be successfully', async () => {
    const ctx = {
      body: jest.fn(),
      status: jest.fn(),
      request: {
        body: {
          email: 'test1@test.com',
          password: 'testpwd',
        }
      }
    };
    await UserController.signIn(ctx);
    expect(ctx.body).toHaveProperty('token');
  });

  test('signIn fails because email does not exist in the database', async () => {
    const ctx = {
      body: jest.fn(),
      status: jest.fn(),
      request: {
        body: {
          email: 'test@unavaliable.com',
          password: 'testpwd',
        }
      }
    };
    await UserController.signIn(ctx);
    expect(ctx.body).toEqual(expect.objectContaining({ error: 'user does not exit' }));
    expect(ctx.status).toBe(404);
  });

  test('signIn fails because password is incorrect', async () => {
    const ctx = {
      body: jest.fn(),
      status: jest.fn(),
      request: {
        body: {
          email: 'test1@test.com',
          password: 'testpwdwrong',
        }
      }
    };
    await UserController.signIn(ctx);
    expect(ctx.body).toEqual(expect.objectContaining({ error: 'invalid password' }));
    expect(ctx.status).toBe(401);
  });
  test('signIn fails because the body is empty', async () => {
    const ctx = {
      body: jest.fn(),
      status: jest.fn(),
      request: {
        body: {}
      }
    };
    await UserController.signIn(ctx);
    expect(ctx.status).toBe(500);
  });
});
