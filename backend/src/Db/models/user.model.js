import pool from "../connect.postgres.js";
class UserModel {
  #sql;
  #params;
  async createUser(email, firstName, lastName, password) {
    try {
      this.#sql = `insert into users("email", "firstName", "lastName", "password") values($1,$2,$3,$4) returning *`;
      this.#params = [email, firstName, lastName, password];
      return await pool.query(this.#sql, this.#params);
    } catch (e) {
      console.log(e);
      throw errorThrower(400, "error when creating user");
    }
  }

  async getUserByEmail(email) {
    try {
      this.#sql = `select * from "users" where "email"=$1 limit 1`;
      this.#params = [email];
      return await pool.query(this.#sql, this.#params);
    } catch (e) {
      console.log(e);
      throw errorThrower(400, "error when getting user by email");
    }
  }

  async getUserById(id) {
    try {
      this.#sql = `select * from "users" where "id"=$1 limit 1`;
      this.#params = [id];
      return await pool.query(this.#sql, this.#params);
    } catch (e) {
      console.log(e);
      throw errorThrower(400, "error when getting user by email");
    }
  }

  async createEvent(
    description,
    eventName,
    eventDate,
    regStart,
    regEnd,
    eventLocation,
    userId
  ) {
    try {
      this.#sql = `insert into events("description", "eventName", "eventDate", "regStart","regEnd","eventLocation","userId") values($1,$2,$3,$4,$5,$6,$7) returning *`;

      this.#params = [
        description,
        eventName,
        eventDate,
        regStart,
        regEnd,
        eventLocation,
        userId,
      ];
      return await pool.query(this.#sql, this.#params);
    } catch (e) {
      console.log(e);
      throw errorThrower(400, "error when create event");
    }
  }
}

export default new UserModel();
