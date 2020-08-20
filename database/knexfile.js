module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/dev.sqlite3',
    },
    useNullAsDefault: true,
  },
  test: {
    client: 'sqlite3',
    log: {
      warn: () => null,
    },
    connection: {
      filename: './database/test.sqlite3',
    },
    migrations: {
      directory: 'database/migrations',
    },
    useNullAsDefault: true,
  },
};
