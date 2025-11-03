const express = require("express");
const {
  getAllVisits,
  getVisitById,
  insertVisit,
  updateVisit,
  deleteVisit,
} = require("../controllers/visit.controller");

const router = express.Router();

router.get("/getAll", async (req, res) => {
  const result = await getAllVisits();
  res.json(result);
});

router.get("/getById/:id", async (req, res) => {
  const result = await getVisitById(req.params.id);
  res.json(result);
});

router.post("/add", async (req, res) => {
  const result = await insertVisit(req.body);
  res.json(result);
});

router.put("/update/:id", async (req, res) => {
  const result = await updateVisit(req.params.id, req.body);
  res.json(result);
});

router.delete("/delete/:id", async (req, res) => {
  const result = await deleteVisit(req.params.id);
  res.json(result);
});

module.exports = router;
