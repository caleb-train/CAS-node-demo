import _ from 'lodash';
import bcrypt from 'bcrypt';
import db from './db';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class DbHandler {
  constructor() {
    this.db = _.cloneDeep(db);
  }

  find({ table, body, query, key = null }) {
    if (!key) key = query;
    return this.db[table].find(tab => tab[query] === body[key]);
  }

  generateJWT(user) {
    return jwt.sign({ id: user.id }, process.env.jwtPrivateKey);
  }

  async createUser(newUser) {
    const id = this.db.users.length + 1;
    const user = _.pick(newUser, ['name', 'email', 'password']);
    user.id = id;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    this.db.users.push(user);
    const token = this.generateJWT(user);
    return token;
  }

  async validateUser(guest, user) {
    const validPassword = await bcrypt.compare(guest.password, user.password);
    if (!validPassword) return false;
    return this.generateJWT(user);
  }

  getUsers(id) {
    const users = _.cloneDeep(this.db.users);
    const contacts = users.filter(user => {
      user.password = undefined;
      user.isAdmin = undefined;
      return user.id !== id;
    });
    return contacts;
  }
}

const dbHandler = new DbHandler();
export default dbHandler;
