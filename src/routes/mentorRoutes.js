const express = require("express");
const router = express.Router();
const mentorsController = require("../controllers/mentorsController");
const reviewsController = require("../controllers/reviewsController");
const recommendController = require("../controllers/recommendController");

router.post("/", mentorsController.createMentor);
router.get("/", mentorsController.getMentors);
router.get("/:id", mentorsController.getMentorById);
router.post("/:id/rate", reviewsController.addRatingAndReview);
router.post("/:id/recommend", recommendController.createRecommendation);

module.exports = router;
