import UserModel from "../Db/models/user.model.js";
import errorThrower from "../helper/errorThrower.js";
import { verifyJwt } from "../helper/JWT.js";

const authenticateUserMiddleware = async (req, res, next) => {
  try {
    const { jwt } = req.body;
    const decode = await verifyJwt(jwt);
    console.log(decode);
    const user = await UserModel.getUserByEmail(decode.email);
    if (user?.rows[0]) {
      next();
    } else {
      throw errorThrower(400, "not authenticated");
    }
  } catch (e) {
    next(e);
  }
};
export default authenticateUserMiddleware;
