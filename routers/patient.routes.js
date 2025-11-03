const express = require("express");
const {
  getAllPatients,
  getPatientById,
  insertPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patient.controller");

const router = express.Router();

router.get("/getAll", async (req, res) => {
  const result = await getAllPatients();
  res.json(result);
});

router.get("/getById/:id", async (req, res) => {
  const result = await getPatientById(req.params.id);
  res.json(result);
});

router.post("/add", async (req, res) => {
  try {
    const result = await insertPatient(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Error inserting patient:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});


router.put("/update/:id", async (req, res) => {
  const result = await updatePatient(req.params.id, req.body);
  res.json(result);
});

router.delete("/delete/:id", async (req, res) => {
  const result = await deletePatient(req.params.id);
  res.json(result);
});

module.exports = router;
