const User = require('../../../database/models/users');

describe('User Model', () => {
  afterAll(async () => {
    await User.getById({ email: 'test@test.com' }).delete();
  });
  test('User.tableName should return users', () => {
    expect(User.tableName).toBe('users');
  });

  test('User.insert should insert a new User', async () => {
    const user = await User.insert({
      fullName: 'User test',
      email: 'test@test.com',
      password: 'testpass',
    });
    expect(user).toBeDefined();
  });

  test('User.getById should return a user by email or id', async () => {
    const userByEmail = await User.getById({ email: 'test@test.com' });
    const userById = await User.getById({ id: userByEmail.id });
    expect(userByEmail).toBeDefined();
    expect(userByEmail.fullName).toBe('User test');
    expect(userById).toBeDefined();
    expect(userById.fullName).toBe('User test');
  });

  test('User.isValidPassword should validate password', async () => {
    const user = await User.getById({ email: 'test@test.com' });
    const isPwdValid = await User.isValidPassword({
      hashedPassword: user.password,
      password: 'testpass',
    });
    expect(isPwdValid).toBe(true);
  });
});
