const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const filePath = path.join(__dirname, "../data/mentors.json");

// Ensure file exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

class MentorModel {
  static getAll() {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  }

  static getById(id) {
    const mentors = this.getAll();
    return mentors.find((m) => m.id === id);
  }

  static createMentor(name) {
    const mentors = this.getAll();

    const mentor = {
      id: uuidv4(),
      name,
      overall_rating: 0,
      total_ratings: 0,
    };

    mentors.push(mentor);
    fs.writeFileSync(filePath, JSON.stringify(mentors, null, 2));

    return mentor;
  }

  static update(mentorObj) {
    const mentors = this.getAll();
    const index = mentors.findIndex((m) => m.id === mentorObj.id);

    if (index === -1) return null;

    mentors[index] = mentorObj;

    fs.writeFileSync(filePath, JSON.stringify(mentors, null, 2));
    return mentorObj;
  }
}

module.exports = MentorModel;
