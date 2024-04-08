import { errorMessages, successMessages } from "../constants/message.js";
import User from "../models/User.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import { validBody } from "../utils/validBody.js";
import { loginSchema, registerSchema } from "../validations/auth.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { generateToken } from "../utils/jwt.js";

dotenv.config({
  path: "./.env.local",
});
const { JWT_SECRET } = process.env;

export const register = async (req, res, next) => {
  try {
    /**
     * ? 1. Kiem tra du lieu dau vao
     * ? 2. Kiem tra email da ton tai chua?
     * ? 3. Ma hoa mat khau
     * ? 4. Tao user moi
     * ? 5. Thong bao thanh cong
     */

    const { email, password } = req.body;

    //  B2: Kiem tra email da ton tai chua?
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({ message: errorMessages.EMAIL_EXISTED });
    }

    // B3: Ma hoa mat khau

    const hashPass = await hashPassword(password);

    // B4: Tao user moi

    const user = await User.create({ ...req.body, password: hashPassword });
    user.password = undefined;
    return res.status(201).json({
      message: successMessages.REGISTER_SUCCESS,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    /**
     * ? B1: Kiem tra email va password
     * ? B2: Kiem tra email co ton tai khong?
     * ? B3: Kiem tra password co khop khong?
     * ? B4: Tao token -> JWT
     * ? B5: Tra ve token cho client
     */

    const { email, password } = req.body;
    const resultValid = validBody(req.body, loginSchema);
    if (resultValid) {
      return res.status(400).json({ message: resultValid.errors });
    }

    //!  B2: Kiem tra email co ton tai khong?
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: errorMessages.EMAIL_NOT_FOUND });
    }

    //!  B3: Kiem tra password co khop khong?
    if (await comparePassword(password, userExist.password)) {
      return res.status(400).json({ message: errorMessages.INVALID_PASSWORD });
    }

    //!  B4: Tao token -> JWT (JSON Web Token)
    const token = generateToken({ _id: userExist._id }, "10d");
    // console.logs(token);

    //!  B5: Tra ve token cho client
    userExist.password = undefined;

    // k in password ra
    return res.status(201).json({
      message: successMessages.LOGIN_SUCCESS,
      // in ra thông tin token và user
      token,
      user: userExist,
    });
  } catch (error) {
    next(error);
  }
};
