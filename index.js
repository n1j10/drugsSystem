const express = require("express");
const dotenv = require("dotenv");
dotenv.config();


// const PORT = process.env.PORT
const PORT = 3000;

const app = express();
const adminRoutes = require("./routers/admin.routes");
const drugsRoutes = require("./routers/drugs.routes");
const patientRouter = require("./routers/patient.routes");
const visitRouter = require("./routers/visit.routes");

app.use(express.json());


app.use("/admin", adminRoutes);
app.use("/drugs", drugsRoutes);
app.use("/patient", patientRouter);
app.use("/visit", visitRouter);

app.listen(PORT, () => {
  console.log(`serve on http://localhost:${PORT}`);
});


//step1 : npm i @prisma/client
//step2 : npm i prisma -D
//step3 : npx prisma init --datasource-provider postgresql
//step4 : get tables form chatgpt to put them on prisma/schema.prisma
//step5 : npx prisma db push
//optional : npx prisma studio

