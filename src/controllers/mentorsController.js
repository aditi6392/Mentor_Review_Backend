const { readJson } = require("../utils/fileUtils");
const Mentor = require("../models/mentorModel");

const REVIEWS_FILE = "reviews.json";

exports.createMentor = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name required" });

  const mentor = Mentor.createMentor(name);
  return res.status(201).json(mentor);
};

exports.getMentors = (req, res) => {
  const minRating = req.query.rating ? Number(req.query.rating) : null;

  const mentors = Mentor.getAll();
  const reviews = readJson(REVIEWS_FILE);

  const enriched = mentors.map((m) => {
    const mReviews = reviews.filter((r) => r.mentor_id === m.id);
    return { ...m, reviews: mReviews };
  });

  if (minRating)
    return res.json(
      enriched.filter((m) => (m.overall_rating) >= minRating)
    );

  return res.json(enriched);
};

exports.getMentorById = (req, res) => {
  const { id } = req.params;

  const mentor = Mentor.getById(id);
  if (!mentor) return res.status(404).json({ error: "mentor not found" });

  const reviews = readJson(REVIEWS_FILE);
  const mReviews = reviews.filter((r) => r.mentor_id === id);

  return res.json({ ...mentor, reviews: mReviews });
};
