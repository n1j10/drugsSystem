const prisma = require("../db");

// Get all patients
const getAllPatients = async () => {
  return await prisma.patient.findMany({
    include: {
      visits: true, // include related visits
    },
  });
};

// Get one patient by ID
const getPatientById = async (id) => {
  return await prisma.patient.findUnique({
    where: { id },
    include: {
      visits: true,
    },
  });
};

// Add a new patient
const insertPatient = async (formData) => {
  return await prisma.patient.create({
    data: {
      name: formData.name,
      age: formData.age,
      phone: formData.phone || null,
      gender: formData.gender || null,
    },
  });
};


// Update patient
const updatePatient = async (id, formData) => {
  return await prisma.patient.update({
    where: { id },
    data: formData,
  });
};

// Delete patient
const deletePatient = async (id) => {
  return await prisma.patient.delete({
    where: { id },
  });
};

module.exports = {
  getAllPatients,
  getPatientById,
  insertPatient,
  updatePatient,
  deletePatient,
};
