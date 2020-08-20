const moment = require('moment');
const bcrypt = require('bcrypt');
const { v1: uuid } = require('uuid');
const db = require('../db');

class User {
  static get tableName() {
    return 'users';
  }

  static insert({ fullName, email, password }) {
    return db(this.tableName).insert({
      id: uuid(),
      fullName,
      email,
      password: bcrypt.hashSync(password, 10),
      createdAt: moment().unix(),
      updatedAt: moment().unix(),
    });
  }

  static getById({ id, email }) {
    if (typeof id !== 'undefined') {
      return db(this.tableName).where('id', id).first();
    }
    return db(this.tableName).where('email', email).first();
  }

  static isValidPassword({ hashedPassword, password }) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}

module.exports = User;
