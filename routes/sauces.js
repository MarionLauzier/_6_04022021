const express = require("express");

const router = express.Router();

const multer = require("../middleware/multer-image");
const saucesCtrl = require("../controllers/sauces");

router.post("/", multer, saucesCtrl.addSauce);

router.put("/:id", multer, saucesCtrl.updateSauce);

router.delete("/:id", saucesCtrl.deleteSauce);

router.post("/:id/like", saucesCtrl.likeSauce);

router.get("/:id", saucesCtrl.getTheSauce);

router.get("/", saucesCtrl.getAllSauces);

module.exports = router;
