import mongoose from "mongoose"; // npm install mongoose

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION); // Kết nối đến MongoDB sử dụng biến môi trường
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Thoát với mã lỗi
  }
};
