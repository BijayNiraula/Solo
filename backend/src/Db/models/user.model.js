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

  async getSubUserByEmail(email) {
    try {
      this.#sql = `select * from "subUser" where "email"=$1 limit 1`;
      this.#params = [email];
      return await pool.query(this.#sql, this.#params);
    } catch (e) {
      console.log(e);
      throw errorThrower(400, "error when getting user by email");
    }
  }

  async createSubUser(userName, email, password, userId) {
    try {
      this.#sql = `insert into "subUser"("userName", "email", "password", "userId") values($1,$2,$3,$4) returning *`;
      this.#params = [userName, email, password, userId];
      return await pool.query(this.#sql, this.#params);
    } catch (e) {
      console.log(e);
      throw errorThrower(400, "error when creating user");
    }
  }

  async getSubUser(userId) {
    try {
      this.#sql = `select * from "subUser" where "userId"=$1 `;
      this.#params = [userId];
      return await pool.query(this.#sql, this.#params);
    } catch (e) {
      console.log(e);
      throw errorThrower(400, "error when creating user");
    }
  }
  async getEvent(userId) {
    try {
      console.log(userId);
      this.#sql = `select * from events where "userId"=$1 `;
      this.#params = [userId];
      return await pool.query(this.#sql, this.#params);
    } catch (e) {
      console.log(e);
      throw errorThrower(400, "error when getting event");
    }
  }
  async getEventById(id) {
    try {
      this.#sql = `select * from events where "id"=$1 `;
      this.#params = [id];
      return await pool.query(this.#sql, this.#params);
    } catch (e) {
      console.log(e);
      throw errorThrower(400, "error when getting event");
    }
  }

  async register(email, firstName, lastName, age, facePath, eventId) {
    try {
      this.#sql = `insert into "registrations"("email", "firstName", "lastName", "age","facePath","eventId") values($1,$2,$3,$4,$5,$6) returning *`;
      this.#params = [email, firstName, lastName, age, facePath, eventId];
      return await pool.query(this.#sql, this.#params);
    } catch (e) {
      console.log(e);
      throw errorThrower(400, "error when register");
    }
  }
  async getRegistrations(eventId) {
    try {
      this.#sql = `select * from registrations where "eventId"=$1`;
      this.#params = [eventId];
      return await pool.query(this.#sql, this.#params);
    } catch (e) {
      console.log(e);
      throw errorThrower(400, "error when register");
    }
  }
}

export default new UserModel();
