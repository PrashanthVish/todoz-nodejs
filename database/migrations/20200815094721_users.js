exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.uuid('id').notNullable().primary();
    table.string('fullName');
    table.string('email', 250).notNullable().unique();
    table.string('password').notNullable();
    table.string('ForgetToken');
    table.bigInteger('ForgotTokenCreatedAt');
    table.boolean('isVerified').defaultTo(false);
    table.bigInteger('createdAt').notNullable();
    table.bigInteger('updatedAt').notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
