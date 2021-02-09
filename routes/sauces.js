const express = require("express");

const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-image");
const saucesCtrl = require("../controllers/sauces");

router.post("/", auth, multer, saucesCtrl.addSauce);

router.put("/:id", auth, multer, saucesCtrl.updateSauce);

router.delete("/:id", auth, saucesCtrl.deleteSauce);

router.post("/:id/like", auth, saucesCtrl.likeSauce);

router.get("/:id", auth, saucesCtrl.getTheSauce);

router.get("/", auth, saucesCtrl.getAllSauces);

module.exports = router;
