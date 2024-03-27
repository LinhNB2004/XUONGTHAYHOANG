import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true, //Email đã tồn tại
    },
    password: {
      type: String,
      required: true, // Không được để trống mật khẩu
    },
    role: {
      type: String,
      default: "member", // Nếu không có giá trị được cung cấp, mặc định sẽ là "member".
    },
  },
  {
    timestamps: true, //Tính năng này tự động thêm hai trường createdAt và updatedAt cho mỗi tài liệu. createdAt sẽ chứa thời điểm tài liệu được tạo và updatedAt sẽ được cập nhật mỗi khi tài liệu được cập nhật.
    versionKey: false, //Tính năng này loại bỏ trường '__v'
  }
);

export default mongoose.model("users", userSchema);
