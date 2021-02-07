const express = require("express");

const router = express.Router();

const saucesCtrl = require("../controllers/sauces");

router.get("/", saucesCtrl.getAllSauces);

router.get("/:id", saucesCtrl.getTheSauce);

router.post("/", sauceCtrl.addSauce);

router.put("/:id", saucesCtrl.updateSauce);

router.delete("/:id", saucesCtrl.deleteSauce);

router.post("/:id/like", saucesCtrl.likeSauce);

module.exports = router;
