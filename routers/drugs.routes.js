const express = require("express");
const {
  getAllDrugs,
  getDrugsById,
  insertDrug,
  deleteDrug,
} = require("../controllers/drugs.controller");

const router = express.Router();

router.get("/getAll", async (req, res) => {
  let list = await getAllDrugs();
  res.json(list);
});
router.get("/getById/:id", async (req, res) => {
  let one = await getDrugsById(req.params.id);
  res.json(one);
});

router.post("/add", async (req, res) => {
  const body = req.body;
  let result = await insertDrug(body);
  res.json(result);
});

router.delete("/delete/:id", async (req, res) => {
  let result = await deleteDrug(req.params.id);
  res.json(result);
});

module.exports = router;
