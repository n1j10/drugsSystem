const prisma = require("../db");

// Get all visits
const getAllVisits = async () => {
  return await prisma.visit.findMany({
    include: {
      patient: true, // show patient info for each visit
    },
  });
};

// Get one visit by ID
const getVisitById = async (id) => {
  return await prisma.visit.findUnique({
    where: { id },
    include: {
      patient: true,
    },
  });
};

// Add new visit
const insertVisit = async (formData) => {
  return await prisma.visit.create({
    data: {
      patientId: formData.patientId,
      date: formData.date ? new Date(formData.date) : undefined,
      note: formData.note,
      drugs: formData.drugs,
      totalPrice: formData.totalPrice,
      paid: formData.paid ?? false,
    },
  });
};

// Update visit
const updateVisit = async (id, formData) => {
  return await prisma.visit.update({
    where: { id },
    data: formData,
  });
};

// Delete visit
const deleteVisit = async (id) => {
  return await prisma.visit.delete({
    where: { id },
  });
};

module.exports = {
  getAllVisits,
  getVisitById,
  insertVisit,
  updateVisit,
  deleteVisit,
};
