const prisma = require("../db");
const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "lskduhflianvkasdjnvskdjhv";


function generateOtp(length = 6) {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}
const createOtp = async (phone) => {
  const admin = await prisma.admin.upsert({
    where: {
      phone,
    },
    create: {
      phone,
    },
    update: {}, 
  });
  let newOtp = generateOtp();
  await prisma.admin.update({
    where: {
      id: admin.id,
    },
    data: {
      otp: newOtp,
      otpCreatedAt: dayjs(),
    },
  });

  return { success: true , otp: newOtp };
};

const verifyOtp = async (phone, otp) => {
  // 1 Find admin by phone
  const admin = await prisma.admin.findUnique({
    where: { phone },
  });

  if (!admin) {
    return { success: false, message: "Admin not found" };
  }

  //1  Check OTP exists
  if (!admin.otp || !admin.otpCreatedAt) {
    return { success: false, message: "No OTP found, please request again" };
  }

  // 2 Check if OTP matches
  if (admin.otp !== otp) {
    return { success: false, message: "Invalid OTP" };
  }

  // 3 Check if OTP expired (valid for 5 minutes)
  const otpAgeMinutes = dayjs().diff(dayjs(admin.otpCreatedAt), "minute");
  if (otpAgeMinutes > 5) {
    return { success: false, message: "OTP expired" };
  }

  // 4 Reset OTP fields
  await prisma.admin.update({
    where: { id: admin.id },
    data: {
      otp: null,
      otpCreatedAt: null,
    },
  });

  //  Generate JWT token
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

const checkToken = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Token is valid",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// const createAdmin = async (formData) => {
//   let admin = await prisma.admin.create({
//     id: formData.id,
//     phone:formData.phone
//   });
//   return admin;
// };






const getAlladmin = async () => {
  let admin = await prisma.admin.findMany();
  return admin;
};

const getAdminById = async (id) => {
  let admin = await prisma.admin.findUnique({
    where: {
      id,
    },
  });
  return admin;
};



const deleteAdmin = async (id) => {
  let admin = await prisma.admin.delete({
    where: {
      id,
    },
  });
  return admin;
};

module.exports = {
 getAlladmin,
 getAdminById,
 getAdminById,
 deleteAdmin,createOtp,verifyOtp,checkToken
};
