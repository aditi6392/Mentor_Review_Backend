const express = require("express");
const router = express.Router();
const recommendController = require("../controllers/recommendController");

router.get("/:id", recommendController.viewRecommendation);

module.exports = router;
