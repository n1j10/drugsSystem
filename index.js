const express = require("express");
const dotenv = require("dotenv");

const app = express();
const adminRoutes = require("./routers/admin.routes");
const drugsRoutes = require("./routers/drugs.routes");
const patientRouter = require("./routers/patient.routes");
const visitRouter = require("./routers/visit.routes");


dotenv.config();
const serverless = require("serverless-http"); // needed for Vercel serverless handler
app.use(express.json());


// const PORT = process.env.PORT
// const PORT = 3000;
const PORT = process.env.PORT || 3000;
// ------------------- Prisma singleton (optional) -------------------
// If you use Prisma in route handlers, prefer this singleton pattern
// to avoid creating a new PrismaClient on every hot-reload or serverless cold start.
// If you don't use Prisma in index.js you can keep this here for reuse in modules,
// or move it to a shared file and require that file from routers that need it.
let prisma;
try {
  const { PrismaClient } = require("@prisma/client");
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
} catch (e) {
  // If @prisma/client is not installed or not needed, ignore gracefully.
  // Logging helps debug missing dependency issues.
  console.warn("Prisma client not initialized (maybe not installed).", e?.message || "");
}
// ------------------------------------------------------------------
app.use("/admin", adminRoutes);
app.use("/drugs", drugsRoutes);
app.use("/patient", patientRouter);
app.use("/visit", visitRouter);

// Built-in middleware

// Optional: enable simple request logging (helpful when debugging on Vercel)
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ ok: false, error: "Internal Server Error" });
});

// If running locally (not in production serverless), start the HTTP server
// On Vercel, NODE_ENV === 'production' and we will export handler instead.
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running locally: http://localhost:${PORT}`);
  });
}

// app.listen(PORT, () => {
//   console.log(`serve on http://localhost:${PORT}`);
// });





module.exports = app;

module.exports.handler = serverless(app);


//step1 : npm i @prisma/client
//step2 : npm i prisma -D
//step3 : npx prisma init --datasource-provider postgresql
//step4 : get tables form chatgpt to put them on prisma/schema.prisma
//step5 : npx prisma db push
//optional : npx prisma studio

