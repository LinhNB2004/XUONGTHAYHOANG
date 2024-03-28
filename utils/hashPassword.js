// MÃ HÓA PASSWORD
import bcryptjs from "bcryptjs";
export const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  const hashPassword = await bcryptjs.hash(password, salt);
  return hashPassword;
};

export const comparePassword = async (password, hashPassword) => {
  const checkPass = await bcryptjs.compare(password, hashPassword); //(mk chưa bị mã hóa, mk đã bị mã hóa)
  if (checkPass) {
    return checkPass;
  }
  return false;
};
