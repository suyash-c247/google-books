import { decode } from "../../utils/jwt.js";
import { message } from "../common/messages.js";
import userModel from "../databsase/models/userModels.js";

/**
 * validate the token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const validateToken = async (req, res, next) => {
  try {
    const { headers: { authorization }, } = req;

    const token = authorization.split(" ")[1];
  
    const { providerId } = await decode(token);
    const userDetails = await userModel.findOne({providerId})
    if (!userDetails) {
      return res.status(404).json({
        message: message.USER_NOT_FOUND
      });
    }
    console.log("in validate token",userDetails.providerId)
    req.providerId =userDetails.providerId;
    next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: message.UNAUTHORIZED
    });
  }
};
