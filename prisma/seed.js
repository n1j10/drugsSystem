
//for test only +++++++++++






// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// async function main() {
//   console.log("🌱 Seeding database...");

//   // 🧑‍💼 Admins
//   await prisma.admin.createMany({
//     data: [
//       { phone: "0770000001", otp: "123456", active: true },
//       { phone: "0770000002", otp: "654321", active: true },
//     ],
//   });

//   // 👨‍⚕️ Patients
//   const patients = await prisma.$transaction([
//     prisma.patient.create({
//       data: {
//         name: "Ali Hasan",
//         age: 30,
//         phone: "0771234567",
//         gender: "Male",
//       },
//     }),
//     prisma.patient.create({
//       data: {
//         name: "Sara Ahmed",
//         age: 25,
//         phone: "0779876543",
//         gender: "Female",
//       },
//     }),
//   ]);

//   // 💊 Drugs
//   const drugs = await prisma.$transaction([
//     prisma.drugs.create({
//       data: {
//         name: "Paracetamol",
//         description: "Pain relief and fever reducer",
//       },
//     }),
//     prisma.drugs.create({
//       data: {
//         name: "Amoxicillin",
//         description: "Antibiotic for infections",
//       },
//     }),
//   ]);

//   // 🩺 Visits
//   await prisma.visit.createMany({
//     data: [
//       {
//         patientId: patients[0].id,
//         visitDate: new Date("2025-11-01T10:00:00Z"),
//         note: "Fever and headache",
//       },
//       {
//         patientId: patients[1].id,
//         visitDate: new Date("2025-11-02T11:00:00Z"),
//         note: "Cough and sore throat",
//       },
//     ],
//   });

//   console.log("✅ Seeding completed successfully!");
// }

// main()
//   .catch((e) => {
//     console.error("❌ Error seeding database:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
