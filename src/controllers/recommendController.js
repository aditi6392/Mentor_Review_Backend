const Recommendation = require("../models/recommendModel");
const { readJson } = require("../utils/fileUtils");

const MENTORS_FILE = "mentors.json";

exports.createRecommendation = (req, res) => {
  const mentor_id = req.params.id;
  const { student_name, letter } = req.body;

  if (!student_name || !letter) {
    return res.status(400).json({
      error: "student_name and letter required",
    });
  }

  // Validate mentor exists
  const mentors = readJson(MENTORS_FILE);
  const mentor = mentors.find((m) => m.id === mentor_id);
  if (!mentor) {
    return res.status(404).json({ error: "mentor not found" });
  }

  // Create recommendation
  const rec = Recommendation.create({ mentor_id, student_name, letter });

  return res.status(201).json({
    ...rec,
    public_link: `/recommend/${rec.id}`,
  });
};

exports.viewRecommendation = (req, res) => {
  const id = req.params.id;

  const rec = Recommendation.getById(id);
  if (!rec) {
    return res.status(404).json({ error: "recommendation not found" });
  }

  const mentors = readJson("mentors.json");
  const mentor = mentors.find((m) => m.id === rec.mentor_id);

  return res.json({
    id: rec.id,
    mentor: mentor ? { id: mentor.id, name: mentor.name } : null,
    student_name: rec.student_name,
    letter: rec.letter,
    created_at: rec.created_at,
    public_link: `/recommend/${rec.id}`,
  });
};
