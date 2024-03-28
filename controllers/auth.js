import User from "../models/User.js";
import { validAuth } from "../utils/validAuth.js";
import { loginSchema, registerSchema } from "../validations/auth.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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
    validAuth(req.body, registerSchema);

    //  B2: Kiem tra email da ton tai chua?
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({ message: "Email da ton tai!" });
    }

    // B3: Ma hoa mat khau

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // B4: Tao user moi

    const user = await User.create({ ...req.body, password: hashPassword });
    user.password = undefined;
    return res.status(201).json({
      message: "Dang ky thanh cong!",
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
    validAuth(req.body, loginSchema);

    //  B2: Kiem tra email co ton tai khong?
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Email khong ton tai!" });
    }

    //  B3: Kiem tra password co khop khong?
    const checkPass = await bcryptjs.compare(password, userExist.password); //(mk chưa bị mã hóa, mk đã bị mã hóa)
    if (!checkPass) {
      return res.status(400).json({ message: "Mat khau khong dung!" });
    }

    //  B4: Tao token -> JWT (JSON Web Token)
    const token = jwt.sign({ id: userExist._id }, "secretcode", {
      expiresIn: "30m",
    });
    // console.log(token);

    //  B5: Tra ve token cho client
    userExist.password = undefined; // k in password ra
    return res.status(200).json({
      message: "Đăng nhập thành công",
      // in ra thông tin token và user
      token,
      userExist,
    });
  } catch (error) {
    next(error);
  }
};
