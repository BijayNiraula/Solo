import UserModel from "../Db/models/user.model.js";
import { generateHash, compareHash } from "../helper/bycrypts.js";
import errorThrower from "../helper/errorThrower.js";
import { generateJwt, verifyJwt } from "../helper/JWT.js";

class UserService {
  async login(email, password) {
    const user = await UserModel.getUserByEmail(email);

    if (!user.rows[0]) {
      throw errorThrower(400, "No user is registered with this email");
    }
    const authenticated = await compareHash(password, user.rows[0].password);
    if (!authenticated) {
      throw errorThrower(400, "invalid password");
    }
    const token = generateJwt(email);
    return token;
  }
  async signup(email, password, firstName, lastName) {
    const existingUser = await UserModel.getUserByEmail(email);
    if (existingUser.rows[0]) {
      throw errorThrower(400, "this email is already registered");
    }
    const hashedPassword = await generateHash(password);

    const result = await UserModel.createUser(
      email,
      firstName,
      lastName,
      hashedPassword
    );
    return result;
  }

  async getLoginDetail(jwt) {
    const data = verifyJwt(jwt);
    let userData = await UserModel.getUserByEmail(data.email);

    console.log(userData);
    let eventsData = await UserModel.getEvent(userData.rows[0].id);
    let subUsers = await UserModel.getSubUser(userData.rows[0].id);
    const d = {
      userData: userData.rows[0],
      eventsData: eventsData.rows,
      subUsers: subUsers.rows,
    };
    return d;
  }
  async createEvent(
    description,
    eventName,
    eventDate,
    regStart,
    regEnd,
    eventLocation,
    jwt
  ) {
    const data = verifyJwt(jwt);
    const user = await UserModel.getUserByEmail(data.email);
    const result = await UserModel.createEvent(
      description,
      eventName,
      eventDate,
      regStart,
      regEnd,
      eventLocation,
      user.rows[0].id
    );
    return true;
  }

  async createEvent(
    description,
    eventName,
    eventDate,
    regStart,
    regEnd,
    eventLocation,
    jwt
  ) {
    const data = verifyJwt(jwt);
    const user = await UserModel.getUserByEmail(data.email);
    const result = await UserModel.createEvent(
      description,
      eventName,
      eventDate,
      regStart,
      regEnd,
      eventLocation,
      user.rows[0].id
    );
    return true;
  }

  async createSubUser(userName, email, password, jwt) {
    const decode = verifyJwt(jwt);

    const mainUser = await UserModel.getUserByEmail(decode.email);

    const hashedPassword = await generateHash(password);
    const user = await UserModel.getSubUserByEmail(email);
    if (user.rows[0]) {
      throw errorThrower(400, "this sub user is already registered");
    }
    console.log(password, hashedPassword);
    const result = await UserModel.createSubUser(
      userName,
      email,
      hashedPassword,
      mainUser.rows[0].id
    );
    return true;
  }

  async getRegistrationForm(id) {
    const result = await UserModel.getEventById(id);
    return result.rows[0];
  }

  async register(email, firstName, lastName, age, facePath, eventId) {
    const result = await UserModel.register(
      email,
      firstName,
      lastName,
      age,
      facePath,
      eventId
    );
    return true;
  }
  async getRegistrations(eventId) {
    const result = await UserModel.getRegistrations(eventId);
    return result.rows;
  }
}

export default new UserService();
