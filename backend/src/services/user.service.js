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
    const result = await UserModel.getUserByEmail(data.email);
    return result.rows[0];
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
}

export default new UserService();
