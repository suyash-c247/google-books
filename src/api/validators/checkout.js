import userModels from "../databsase/models/userModels.js";
import { message } from "../common/messages.js";
import bcrypt from "bcryptjs";
/**
 * checkout user email and password exist or not
 **/
export const userCheckout = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: message.USER_NOT_FOUND,
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(404).json({
        message: message.PASSWORD_NOT_MATCH,
      });
    }
    req.providerId =user.providerId
    next();
  } catch (error) {
      console.log(error)
    return res.status(500).json({
      message: message.ERROR_MESSAGE,
    });
  }
};
