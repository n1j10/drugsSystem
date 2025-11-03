const db = require("../db");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (body) => {
  const phone = body.phone;
  const password = body.password;
  const name = body.name;

  const hashedPassword = await bcrypt.hash(password, 10); //!
  const result = await db.query(`INSERT INTO Client (name, phone, password)
                VALUES
                ('${name}', '${phone}', '${hashedPassword}');`);

  if (result.rowCount === 1) {
    return true;
  } else {
    return false;
  }
};



const login = async (phone, password) => {
  const result = await db.query(`select * from client where phone = '${phone}'`);
  if (result.rowCount !== 1) {
    return { success: false, message: "user not found!" };
  }

  const user = result.rows[0];
  const hashedPassword = user.password;  //! 
  const isPassValid = await bcrypt.compare(password, hashedPassword);   //!
  if (!isPassValid) {
    return { success: false, message: "لاتصير لوتي" };
  }

  const token = jwt.sign(  //!
    {
      id: user.id,
      phone: user.phone,
      name: user.name,  //!
    },
    process.env.SECRET_KEY  //!
  );  //!
  
  return { success: true, token: token }; //!
};






module.exports = {
  register,
  login,
};


















const prisma = require("../db");
const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key"; // better to store in .env

const verifyOtp = async (phone, otp) => {
  // 1️⃣ Find admin by phone
  const admin = await prisma.admin.findUnique({
    where: { phone },
  });

  if (!admin) {
    return { success: false, message: "Admin not found" };
  }

  // 2️⃣ Check OTP exists
  if (!admin.otp || !admin.otpCreatedAt) {
    return { success: false, message: "No OTP found, please request again" };
  }

  // 3️⃣ Check if OTP matches
  if (admin.otp !== otp) {
    return { success: false, message: "Invalid OTP" };
  }

  // 4️⃣ Check if OTP expired (valid for 5 minutes)
  const otpAgeMinutes = dayjs().diff(dayjs(admin.otpCreatedAt), "minute");
  if (otpAgeMinutes > 5) {
    return { success: false, message: "OTP expired" };
  }

  // 5️⃣ Reset OTP fields
  await prisma.admin.update({
    where: { id: admin.id },
    data: {
      otp: null,
      otpCreatedAt: null,
    },
  });

  // 6️⃣ Generate JWT token
  const token = jwt.sign(
    {
      id: admin.id,
      phone: admin.phone,
    },
    JWT_SECRET,
    { expiresIn: "7d" } // token valid for 7 days
  );

  return {
    success: true,
    token,
    message: "OTP verified successfully",
  };
};

module.exports = {
  verifyOtp,
};
