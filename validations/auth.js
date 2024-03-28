import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().required(), // Kiểu chuỗi, 1 địa chỉ email hợp lệ, không được bỏ trống
  password: Joi.string().min(6).required(), // kiểu chuỗi, ít nhất 6 ký tự, không được bỏ trống
  username: Joi.string().min(6),
  phoneNumber: Joi.string().min(10).max(11),
  avatar: Joi.string(),
  address: Joi.string(),
});
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
