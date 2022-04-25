import { message } from "../common/messages.js";
import userModels from "../databsase/models/userModels.js";
import { encode } from "../../utils/jwt.js";

/**
 * login a user and generate JWT token
 * @param { req, res }
 * @returns JsonResponse
 */
const loginAction = async (req, res) => {
  try {
    const { firstName, lastName, email, providerId, providerType } = req.body;
    const userExist = await userModels.find({ providerId: providerId });
    if (userExist.length === 0) {
      // const emailExist = await userModels.findOne({ email: email });
      // if (emailExist) {
      //   return res.status(500).json({
      //     message: message.EMAIL_EXIST,
      //   });
      // }

      const user = await userModels.create({
        firstName,
        lastName,
        email,
        providerId,
        providerType,
      });

      console.log("while create and login",providerId) 
      return res.status(200).json({
        message: message.LOGIN_SUCCESS,
        user: user,
        token: `Bearer ${await encode({
          providerId: providerId,
        })}`,
      });
    }
    console.log("while  login",providerId) 
 
    return res.status(200).json({
      message: message.LOGIN_SUCCESS,
      user: userExist,
      token: `Bearer ${await encode({
        providerId: userExist.providerId,
      })}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: message.ERROR_MESSAGE,
    });
  }
};

const authController = {
  loginAction,
};
export default authController;
