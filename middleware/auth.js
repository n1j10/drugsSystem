const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  try {
    // Expect header format: Authorization: Bearer <token>
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "lskduhflianvkasdjnvskdjhv");
    req.user = decoded; // attach user data from token (id, phone)
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message || "Unauthorized" });
  }
};

module.exports = verifyAuth;
