// freeze : đóng băng Object lại => k cho sửa xóa
export const errorMessages = Object.freeze({
  INVALID_EMAIL: "Invalid email", // Email không hợp lệ
  INVALID_PASSWORD: "Invalid password", // Mật khẩu không hợp lệ
  EMAIL_EXISTED: "Email already exists", // Email đã tồn tại
  NOT_FOUND: "Not found", // Không tìm thấy
  ERROR_SERVER: "Server error", // Lỗi máy chủ
  EMAIL_NOT_FOUND: "Email not found", //Không tìm thấy email
  PASSWORD_NOT_MATCH: "Password not", //Không có mật khẩu
  TOKEN_INVALID: "Token invalid", //Mã thông báo không hợp lệ

  GET_FAIL: "Get fail",
  CREATE_FAIL: "Create fail",
  UPDATE_FAIL: "Update fail",
  DELETE_FAIL: "Delete fail", // xóa thất bại
});
export const successMessages = Object.freeze({
  REGISTER_SUCCESS: "Register successfully!", //Đăng ký thành công!
  LOGIN_SUCCESS: "Login successfully!", //Đăng nhập thành công!
  GET_USER_SUCCESS: "Get user successfully!", //Nhận người dùng thành công!
  UPDATE_USER_SUCCESS: "Update user successfully!", //Cập nhật người dùng thành công!
  DELETE_USER_SUCCESS: "Delete user successfully!", //Xóa người dùng thành công!
  GET_PROFILE_SUCCESS: "Get profile successfully!", //Nhận hồ sơ thành công!
  RESET_PASSWORD_SUCCESS: "Reset password successfully!", //Đặt lại mật khẩu thành công!
  UPDATE_PROFILE_SUCCESS: "Update profile successfully!", //Cập nhật hồ sơ thành công!

  GET_PRODUCT_SUCCESS: "Get product successfully!", //Nhận sản phẩm thành công
  CREATE_PRODUCT_SUCCESS: "Create product successfully!", //Tạo sản phẩm thành công!
  UPDATE_PRODUCT_SUCCESS: "Update product successfully!", //Cập nhật sản phẩm thành công!
  DELETE_PRODUCT_SUCCESS: "Delete product successfully!", //Xóa sản phẩm thành công!
});
