import errorThrower from "../helper/errorThrower.js";
import UserService from "../services/user.service.js";
class UserController {
  async login(req, res, next) {
    try {
      const { password, email } = req.body;
      if (!password || !email) {
        throw errorThrower(400, "please provide all the fields");
      }
      const results = await UserService.login(email, password);
      res.status(200).send({
        status: "success",
        data: {
          jwt: results,
        },
        message: "user registered successfully",
      });
    } catch (e) {
      next(e);
    }
  }

  async signup(req, res, next) {
    try {
      const { firstName, lastName, password, email } = req.body;
      if (!firstName || !lastName || !password || !email) {
        throw errorThrower(400, "please provide all the fields");
      }
      const results = await UserService.signup(
        email,
        password,
        firstName,
        lastName
      );
      res.status(200).send({
        status: "success",
        message: "user registered successfully",
      });
    } catch (e) {
      next(e);
    }
  }
  async isLogin(req, res, next) {
    try {
      const { firstName, lastName, password, email } = req.body;
      if (!firstName || !lastName || !password || !email) {
        throw errorThrower(400, "please provide all the fields");
      }
      const results = await UserService.signup(
        email,
        password,
        firstName,
        lastName
      );
      res.status(200).send({
        status: "success",
        message: "user registered successfully",
      });
    } catch (e) {
      next(e);
    }
  }
  async getLoginDetail(req, res, next) {
    try {
      const { jwt } = req.body;

      if (!jwt) {
        throw errorThrower(400, "please provide all the fields");
      }
      const results = await UserService.getLoginDetail(jwt);
      console.log(results);
      res.status(200).send({
        status: "success",
        message: "get login detail",
        data: results,
      });
    } catch (e) {
      next(e);
    }
  }

  async createEvent(req, res, next) {
    try {
      const {
        description,
        eventName,
        eventDate,
        regStart,
        regEnd,
        eventLocation,
        jwt,
      } = req.body;
      if (
        !description ||
        !eventName ||
        !eventDate ||
        !regStart ||
        !regEnd ||
        !eventLocation ||
        !jwt
      ) {
        throw errorThrower(400, "please provide all the fields");
      }
      const results = await UserService.createEvent(
        description,
        eventName,
        eventDate,
        regStart,
        regEnd,
        eventLocation,
        jwt
      );
      res.status(200).send({
        status: "success",
        message: "event created successfully",
      });
    } catch (e) {
      next(e);
    }
  }
  async createSubUser(req, res, next) {
    try {
      const { email, password, userName, jwt } = req.body;
      if (!email || !password || !userName || !jwt) {
        throw errorThrower(400, "please provide all the fields");
      }
      const results = await UserService.createSubUser(
        userName,
        email,
        password,
        jwt
      );
      res.status(200).send({
        status: "success",
        message: "subUser created successfully",
      });
    } catch (e) {
      next(e);
    }
  }

  async getRegistrationForm(req, res, next) {
    try {
      const { id } = req.body;
      if (!id) {
        throw errorThrower(400, "please provide all the field");
      }
      const result = await UserService.getRegistrationForm(id);
      res.status(200).send({
        status: "success",
        data: result,
        message: "subUser created successfully",
      });
    } catch (e) {
      next(e);
    }
  }

  async register(req, res, next) {
    try {
      const { email, firstName, lastName, age, face, eventId } = req.body;
      if (!email || !firstName || !lastName || !age || !face || eventId) {
        throw errorThrower(400, "please provide all the field");
      }
      const result = await UserService.register(
        email,
        firstName,
        lastName,
        age,
        face,
        eventId
      );

      res.status(200).send({
        status: "success",
        message: "register successfully",
      });
    } catch (e) {
      next(e);
    }
  }

  async getRegistrations(req, res, next) {
    try {
      const { eventId } = req.body;
      if (!eventId) {
        throw errorThrower(400, "please provide all the field");
      }
      const result = await UserService.getRegistrations(eventId);

      res.status(200).send({
        status: "success",
        data: result,
        message: "register successfully",
      });
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
