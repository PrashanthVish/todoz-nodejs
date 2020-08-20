const db = require('../../database/db');

global.beforeAll(async () => {
  await db.migrate.latest();
});

global.afterAll(async () => {
  await db.migrate.rollback();
});
