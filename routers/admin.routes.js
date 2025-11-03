const express = require("express");
const {
  getAlladmin,getAdminById,deleteAdmin,createOtp,verifyOtp,checkToken
} = require("../controllers/admin.controller");

const verifyAuth = require("../middleware/auth");

const router = express.Router();
// Send OTP
router.post("/send", async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ success: false, message: "Phone is required" });

    const result = await createOtp(phone);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Verify OTP
router.post("/verify", async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp)
      return res.status(400).json({ success: false, message: "Phone and OTP are required" });

    const result = await verifyOtp(phone, otp);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



router.get("/check-token", verifyAuth, checkToken);

// router.post("/add", async (req, res) => {
//   const body = req.body;
//   let result = await createAdmin(body);
//   res.json(result);
// });



router.get("/getAll", async (req, res) => {
  let list = await getAlladmin();
  res.json(list);
});


router.get("/getById/:id", async (req, res) => {
  let oneId = await getAdminById(req.params.id);
  res.json(oneId);
});




router.delete("/delete/:id", async (req, res) => {
  let result = await deleteAdmin(req.params.id);
  res.json(result);
});

module.exports = router;