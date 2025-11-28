const Review = require("../models/reviewModel");
const { readJson, writeJson } = require("../utils/fileUtils");

const MENTORS_FILE = "mentors.json";
const USERS_FILE = "users.json";

exports.addRatingAndReview = (req, res) => {
  const mentor_id = req.params.id;
  const { user_id, rating, text } = req.body;

  // Validate required fields
  if (!user_id || typeof rating !== "number") {
    return res
      .status(400)
      .json({ error: "user_id and numeric rating required" });
  }

  // Word limit
  if (text && text.split(/\s+/).length > 50) {
    return res.status(400).json({ error: "review must be 50 words or less" });
  }

  // rating must be 1–5
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: "rating must be between 1 and 5" });
  }

  // Validate user exists
  const users = readJson(USERS_FILE);
  const user = users.find((u) => u.id === user_id);
  if (!user) return res.status(404).json({ error: "user not found" });

  // Validate mentor exists
  const mentors = readJson(MENTORS_FILE);
  const mentor = mentors.find((m) => m.id === mentor_id);
  if (!mentor) return res.status(404).json({ error: "mentor not found" });

  // Create review using Model
  const review = Review.createReview({ mentor_id, user_id, rating, text });

  // Update mentor rating
  const totalBefore = mentor.total_ratings || 0;
  const sumBefore = mentor.overall_rating * totalBefore;
  const newTotal = totalBefore + 1;
  const newAvg = (sumBefore + rating) / newTotal;

  mentor.total_ratings = newTotal;
  mentor.overall_rating = Math.round(newAvg * 100) / 100;

  writeJson(MENTORS_FILE, mentors);

  res.status(201).json(review);
};

exports.listReviews = (req, res) => {
  const mentorId = req.query.mentor_id;

  if (mentorId) {
    return res.json(Review.getByMentor(mentorId));
  }

  return res.json(Review.getAll());
};
